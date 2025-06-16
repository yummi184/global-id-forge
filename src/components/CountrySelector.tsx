
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Globe2 } from "lucide-react";

interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸", region: "North America" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "North America" },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe" },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe" },
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia" },
  { code: "AU", name: "Australia", flag: "🇦🇺", region: "Oceania" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", region: "South America" },
  { code: "IN", name: "India", flag: "🇮🇳", region: "Asia" },
  { code: "CN", name: "China", flag: "🇨🇳", region: "Asia" },
  { code: "IT", name: "Italy", flag: "🇮🇹", region: "Europe" },
  { code: "ES", name: "Spain", flag: "🇪🇸", region: "Europe" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", region: "North America" },
  { code: "RU", name: "Russia", flag: "🇷🇺", region: "Europe/Asia" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", region: "Africa" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", region: "Asia" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", region: "Europe" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", region: "Europe" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", region: "Europe" },
  { code: "NO", name: "Norway", flag: "🇳🇴", region: "Europe" },
];

interface CountrySelectorProps {
  onSelect: (country: Country) => void;
}

const CountrySelector = ({ onSelect }: CountrySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const regions = ["All", ...Array.from(new Set(countries.map(c => c.region)))];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "All" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Globe2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Country</h2>
        <p className="text-gray-600">Choose the country for your passport generation</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCountries.map((country) => (
              <Card
                key={country.code}
                className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 hover:border-blue-500"
                onClick={() => onSelect(country)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{country.flag}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{country.name}</h3>
                  <p className="text-sm text-gray-500">{country.region}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <Globe2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No countries found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CountrySelector;
