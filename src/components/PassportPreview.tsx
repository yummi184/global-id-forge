
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Download, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PassportPreviewProps {
  passportData: any;
  onBack: () => void;
  onEdit: () => void;
}

const PassportPreview = ({ passportData, onBack, onEdit }: PassportPreviewProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your passport is being downloaded as a PDF.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Passport Preview</h2>
            <p className="text-gray-600">Review your generated passport</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Passport Design */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Passport Cover */}
          <Card className="w-96 h-[500px] bg-gradient-to-br from-blue-900 to-blue-800 border-0 shadow-2xl">
            <CardContent className="p-8 text-center text-white h-full flex flex-col justify-between">
              <div>
                <div className="text-6xl mb-4">{passportData.country.flag}</div>
                <h3 className="text-2xl font-bold mb-2">{passportData.country.name.toUpperCase()}</h3>
                <p className="text-lg opacity-90">PASSPORT</p>
              </div>
              
              <div className="space-y-4">
                {passportData.photoPreview && (
                  <div className="flex justify-center">
                    <img
                      src={passportData.photoPreview}
                      alt="Passport photo"
                      className="w-24 h-32 object-cover rounded border-2 border-white"
                    />
                  </div>
                )}
                
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-lg">
                    {passportData.firstName} {passportData.lastName}
                  </p>
                  <p className="opacity-90">Passport No: {passportData.passportNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passport Inside Pages */}
          <Card className="w-96 h-[500px] ml-4 border shadow-xl">
            <CardContent className="p-6 h-full">
              <div className="text-center mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">PERSONAL DETAILS</h4>
                <div className="w-full h-px bg-gray-300"></div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-600">Given Name(s)</p>
                    <p className="text-gray-900">{passportData.firstName}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Surname</p>
                    <p className="text-gray-900">{passportData.lastName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-600">Date of Birth</p>
                    <p className="text-gray-900">{formatDate(passportData.dateOfBirth)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Sex</p>
                    <p className="text-gray-900">{passportData.sex}</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">Place of Birth</p>
                  <p className="text-gray-900">{passportData.placeOfBirth}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">Nationality</p>
                  <p className="text-gray-900">{passportData.nationality}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-600">Height</p>
                    <p className="text-gray-900">{passportData.height ? `${passportData.height} cm` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Eye Color</p>
                    <p className="text-gray-900">{passportData.eyeColor || "N/A"}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-600">Issue Date</p>
                      <p className="text-gray-900">{formatDate(passportData.issueDate)}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">Expiry Date</p>
                      <p className="text-gray-900">{formatDate(passportData.expiryDate)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-gray-600">Issuing Authority</p>
                    <p className="text-gray-900 text-xs">
                      {passportData.issuingAuthority || `Ministry of Foreign Affairs - ${passportData.country.name}`}
                    </p>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <div className="w-full h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded flex items-center justify-center">
                    <span className="text-xs font-mono text-blue-800">
                      {passportData.passportNumber}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">🎉 Your Passport is Ready!</h3>
            <p className="text-gray-600 mb-4">
              Your {passportData.country.name} passport has been successfully generated. 
              You can download it as a PDF or share it with others.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PassportPreview;
