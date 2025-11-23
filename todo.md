# LihatTech Support CCTV Website Development Plan

## Files to Create/Modify:

1. **index.html** - Update title and meta tags for LihatTech Support
2. **src/pages/Index.tsx** - Main homepage with all sections
3. **src/components/Hero.tsx** - Hero section with brand name and navigation
4. **src/components/About.tsx** - About Us section with company profile
5. **src/components/Services.tsx** - Interactive services chart using Chart.js
6. **src/components/Packages.tsx** - Package options with pricing and voucher input
7. **src/components/PriceSimulator.tsx** - Interactive price calculator
8. **src/components/BookingForm.tsx** - Booking form with WhatsApp integration
9. **src/data/database.json** - Mock database with prices, brands, vouchers
10. **src/lib/pricing.ts** - Pricing calculation logic
11. **src/lib/whatsapp.ts** - WhatsApp integration utility

## Key Features:
- Responsive design with blue/white/gray color scheme
- Interactive Chart.js for services visualization
- Dynamic pricing calculator with DVR scaling logic
- Voucher validation system
- WhatsApp booking integration
- Professional CCTV service portfolio layout

## Database Structure (JSON):
- component_prices: cameras, accessories, HDD, cables, etc.
- cctv_brands: Hilook, Dahua with pricing
- voucher_codes: validation and WhatsApp routing
- default_whatsapp_number: fallback contact