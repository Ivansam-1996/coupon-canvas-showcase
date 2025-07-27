import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Globe, DollarSign, Languages } from "lucide-react";

interface CouponData {
  currency: string;
  locale: string;
}

interface LocalizationPanelProps {
  couponData: CouponData;
  setCouponData: (data: any) => void;
}

export function LocalizationPanel({ couponData, setCouponData }: LocalizationPanelProps) {
  const currencies = [
    { value: "USD", label: "US Dollar ($)", symbol: "$" },
    { value: "EUR", label: "Euro (€)", symbol: "€" },
    { value: "GBP", label: "British Pound (£)", symbol: "£" },
    { value: "JPY", label: "Japanese Yen (¥)", symbol: "¥" },
    { value: "CAD", label: "Canadian Dollar (C$)", symbol: "C$" }
  ];

  const languages = [
    { value: "en-US", label: "English (US)", flag: "🇺🇸" },
    { value: "en-GB", label: "English (UK)", flag: "🇬🇧" },
    { value: "es-ES", label: "Spanish", flag: "🇪🇸" },
    { value: "fr-FR", label: "French", flag: "🇫🇷" },
    { value: "de-DE", label: "German", flag: "🇩🇪" },
    { value: "ja-JP", label: "Japanese", flag: "🇯🇵" }
  ];

  const updateField = (field: keyof CouponData, value: string) => {
    setCouponData({ ...couponData, [field]: value });
  };

  const selectedCurrency = currencies.find(c => c.value === couponData.currency);
  const selectedLanguage = languages.find(l => l.value === couponData.locale);

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-coupon-green to-coupon-blue text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Localization Settings
          <Badge variant="secondary" className="bg-warning text-warning-foreground">USP</Badge>
        </CardTitle>
        <CardDescription className="text-white/80">
          Configure currency and language settings for global reach
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Currency & Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Currency</Label>
            <Select value={couponData.currency} onValueChange={(value) => updateField("currency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {currency.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Language</Label>
            <Select value={couponData.locale} onValueChange={(value) => updateField("locale", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    <div className="flex items-center gap-2">
                      <span>{language.flag}</span>
                      {language.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Live Preview */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Localized Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-background rounded border">
                <div className="text-sm text-muted-foreground mb-1">Coupon Value Display</div>
                <div className="text-xl font-bold text-primary">
                  {selectedCurrency?.symbol}20 OFF
                </div>
                <div className="text-sm text-muted-foreground">
                  20% discount in {selectedCurrency?.label}
                </div>
              </div>

              <div className="p-3 bg-background rounded border">
                <div className="text-sm text-muted-foreground mb-1">Language Format</div>
                <div className="text-lg font-semibold">
                  {selectedLanguage?.flag} {selectedLanguage?.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  Date format: {couponData.locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
                </div>
              </div>
            </div>

            {/* Sample Coupon Text in Different Languages */}
            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium mb-2">Sample Coupon Text:</div>
              <div className="space-y-2">
                {couponData.locale === 'en-US' && (
                  <p className="text-sm">"Get 20% off your next purchase! Use code SAVE20 at checkout. Valid until March 31, 2024."</p>
                )}
                {couponData.locale === 'es-ES' && (
                  <p className="text-sm">"¡Obtén 20% de descuento en tu próxima compra! Usa el código SAVE20 al finalizar. Válido hasta el 31 de marzo de 2024."</p>
                )}
                {couponData.locale === 'fr-FR' && (
                  <p className="text-sm">"Obtenez 20% de réduction sur votre prochain achat ! Utilisez le code SAVE20 à la caisse. Valable jusqu'au 31 mars 2024."</p>
                )}
                {couponData.locale === 'de-DE' && (
                  <p className="text-sm">"Erhalten Sie 20% Rabatt auf Ihren nächsten Einkauf! Verwenden Sie den Code SAVE20 an der Kasse. Gültig bis zum 31. März 2024."</p>
                )}
                {!['en-US', 'es-ES', 'fr-FR', 'de-DE'].includes(couponData.locale) && (
                  <p className="text-sm">"Get 20% off your next purchase! Use code SAVE20 at checkout. Valid until March 31, 2024."</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-primary">
              {selectedCurrency?.symbol}1,234.56
            </div>
            <div className="text-sm text-muted-foreground">Number Format</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-primary">
              {couponData.locale === 'en-US' ? '03/31/2024' : '31/03/2024'}
            </div>
            <div className="text-sm text-muted-foreground">Date Format</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-primary">
              {selectedLanguage?.flag}
            </div>
            <div className="text-sm text-muted-foreground">Region</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}