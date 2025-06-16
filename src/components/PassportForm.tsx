
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, User, Calendar, MapPin, Eye } from "lucide-react";

interface PassportFormProps {
  country: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const PassportForm = ({ country, onSubmit, onBack }: PassportFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: country?.name || "",
    sex: "",
    height: "",
    eyeColor: "",
    passportNumber: "",
    issueDate: "",
    expiryDate: "",
    issuingAuthority: "",
    photo: null as File | null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate passport number if not provided
    const passportNumber = formData.passportNumber || 
      `${country.code}${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
    
    // Set default dates if not provided
    const issueDate = formData.issueDate || new Date().toISOString().split('T')[0];
    const expiryDate = formData.expiryDate || 
      new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    onSubmit({
      ...formData,
      passportNumber,
      issueDate,
      expiryDate,
      photoPreview,
    });
  };

  const eyeColors = ["Brown", "Blue", "Green", "Hazel", "Gray", "Amber"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{country.flag}</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{country.name} Passport</h2>
            <p className="text-gray-600">Fill in your passport details</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Passport photo"
                    className="w-32 h-40 object-cover mx-auto rounded border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-32 h-40 mx-auto bg-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="photo" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </div>
                </Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Upload a passport-style photo (JPG, PNG)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                  <Input
                    id="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sex">Sex *</Label>
                  <Select value={formData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="X">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="e.g., 175"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eyeColor">Eye Color</Label>
                  <Select value={formData.eyeColor} onValueChange={(value) => handleInputChange("eyeColor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select eye color" />
                    </SelectTrigger>
                    <SelectContent>
                      {eyeColors.map(color => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Passport Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Passport Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number</Label>
                <Input
                  id="passportNumber"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                  placeholder="Auto-generated if empty"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => handleInputChange("issueDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuingAuthority">Issuing Authority</Label>
              <Input
                id="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={(e) => handleInputChange("issuingAuthority", e.target.value)}
                placeholder={`Ministry of Foreign Affairs - ${country.name}`}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
            Generate Passport
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PassportForm;
