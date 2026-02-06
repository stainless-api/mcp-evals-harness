terraform {
  required_providers {
    stripe = {
      source  = "stripe/stripe"
      version = "0.1.3"
    }
  }
}

provider "stripe" {
  # API key is read from STRIPE_API_KEY environment variable
}

# =============================================================================
# Customers (500)
# =============================================================================

resource "stripe_customer" "customer_01" {
  name        = "Olivia Martinez"
  email       = "olivia.martinez@heliosphere.io"
  phone       = "+14155550101"
  description = "Enterprise client — Heliosphere Inc., onboarded Q3 2024"

  address {
    line1       = "742 Evergreen Terrace"
    line2       = "Suite 200"
    city        = "San Francisco"
    state       = "CA"
    postal_code = "94107"
    country     = "US"
  }

  shipping {
    name  = "Olivia Martinez"
    phone = "+14155550101"
    address {
      line1       = "742 Evergreen Terrace"
      line2       = "Suite 200"
      city        = "San Francisco"
      state       = "CA"
      postal_code = "94107"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0001"

  metadata = {
    company    = "Heliosphere Inc."
    plan       = "enterprise"
    sales_rep  = "jchen"
    segment    = "mid-market"
  }
}

resource "stripe_customer" "customer_02" {
  name        = "Liam Nakamura"
  email       = "liam.nakamura@vortexlabs.dev"
  phone       = "+12125550102"
  description = "Startup founder — Vortex Labs, early adopter program"

  address {
    line1       = "350 Fifth Avenue"
    line2       = "Floor 34"
    city        = "New York"
    state       = "NY"
    postal_code = "10118"
    country     = "US"
  }

  shipping {
    name  = "Liam Nakamura"
    phone = "+12125550102"
    address {
      line1       = "350 Fifth Avenue"
      line2       = "Floor 34"
      city        = "New York"
      state       = "NY"
      postal_code = "10118"
      country     = "US"
    }
  }

  preferred_locales = ["en", "ja"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0002"

  metadata = {
    company   = "Vortex Labs"
    plan      = "startup"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_03" {
  name        = "Emma Johansson"
  email       = "emma.johansson@nordiqflow.se"
  phone       = "+46701234567"
  description = "Nordic region lead — NordiqFlow AB, annual contract"

  address {
    line1       = "Kungsgatan 44"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Emma Johansson"
    phone = "+46701234567"
    address {
      line1       = "Kungsgatan 44"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0003"

  metadata = {
    company   = "NordiqFlow AB"
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_04" {
  name        = "Noah Patel"
  email       = "noah.patel@cascadehq.com"
  phone       = "+14085550104"
  description = "Product lead — Cascade HQ, migrated from competitor"

  address {
    line1       = "2855 Stevens Creek Blvd"
    line2       = "Ste 2300"
    city        = "Santa Clara"
    state       = "CA"
    postal_code = "95050"
    country     = "US"
  }

  shipping {
    name  = "Noah Patel"
    phone = "+14085550104"
    address {
      line1       = "2855 Stevens Creek Blvd"
      line2       = "Ste 2300"
      city        = "Santa Clara"
      state       = "CA"
      postal_code = "95050"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0004"

  metadata = {
    company       = "Cascade HQ"
    plan          = "pro"
    sales_rep     = "jchen"
    segment       = "smb"
    migrated_from = "competitor_x"
  }
}

resource "stripe_customer" "customer_05" {
  name        = "Sophia Dubois"
  email       = "sophia.dubois@luminarestudio.fr"
  phone       = "+33612345678"
  description = "Creative agency — Luminare Studio, Paris office"

  address {
    line1       = "27 Rue de Rivoli"
    line2       = "3ème étage"
    city        = "Paris"
    postal_code = "75004"
    country     = "FR"
  }

  shipping {
    name  = "Sophia Dubois"
    phone = "+33612345678"
    address {
      line1       = "27 Rue de Rivoli"
      line2       = "3ème étage"
      city        = "Paris"
      postal_code = "75004"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0005"

  metadata = {
    company   = "Luminare Studio"
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_06" {
  name        = "James O'Sullivan"
  email       = "james.osullivan@greenfieldio.ie"
  phone       = "+353871234567"
  description = "CTO — Greenfield.io, Dublin-based SaaS company"

  address {
    line1       = "32 Merrion Square"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "James O'Sullivan"
    phone = "+353871234567"
    address {
      line1       = "32 Merrion Square"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0006"

  metadata = {
    company   = "Greenfield.io"
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_07" {
  name        = "Aisha Rahman"
  email       = "aisha.rahman@peakmindlabs.com"
  phone       = "+6591234567"
  description = "Wellness-tech startup — PeakMind Labs, Singapore"

  address {
    line1       = "1 Raffles Place"
    line2       = "#20-61 One Raffles Place"
    city        = "Singapore"
    postal_code = "048616"
    country     = "SG"
  }

  shipping {
    name  = "Aisha Rahman"
    phone = "+6591234567"
    address {
      line1       = "1 Raffles Place"
      line2       = "#20-61 One Raffles Place"
      city        = "Singapore"
      postal_code = "048616"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "ms"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0007"

  metadata = {
    company   = "PeakMind Labs"
    plan      = "startup"
    sales_rep = "rtan"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_08" {
  name        = "Carlos Mendes"
  email       = "carlos.mendes@aurorasys.com.br"
  phone       = "+5511912345678"
  description = "Head of Engineering — Aurora Systems, São Paulo"

  address {
    line1       = "Av. Paulista 1578"
    line2       = "Conjunto 1204"
    city        = "São Paulo"
    state       = "SP"
    postal_code = "01310-200"
    country     = "BR"
  }

  shipping {
    name  = "Carlos Mendes"
    phone = "+5511912345678"
    address {
      line1       = "Av. Paulista 1578"
      line2       = "Conjunto 1204"
      city        = "São Paulo"
      state       = "SP"
      postal_code = "01310-200"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0008"

  metadata = {
    company   = "Aurora Systems"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_09" {
  name        = "Yuki Tanaka"
  email       = "yuki.tanaka@skybridge.jp"
  phone       = "+81901234567"
  description = "VP of Product — SkyBridge Corp, Tokyo HQ"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Shinagawa Intercity Tower A"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Yuki Tanaka"
    phone = "+81901234567"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Shinagawa Intercity Tower A"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0009"

  metadata = {
    company   = "SkyBridge Corp"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_10" {
  name        = "Priya Sharma"
  email       = "priya.sharma@nebulaedge.in"
  phone       = "+919876543210"
  description = "Founder — NebulaEdge Technologies, Bangalore"

  address {
    line1       = "Embassy Tech Village"
    line2       = "Block B, 4th Floor"
    city        = "Bengaluru"
    state       = "Karnataka"
    postal_code = "560103"
    country     = "IN"
  }

  shipping {
    name  = "Priya Sharma"
    phone = "+919876543210"
    address {
      line1       = "Embassy Tech Village"
      line2       = "Block B, 4th Floor"
      city        = "Bengaluru"
      state       = "Karnataka"
      postal_code = "560103"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0010"

  metadata = {
    company   = "NebulaEdge Technologies"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_11" {
  name        = "Marcus Weber"
  email       = "marcus.weber@ironforge.de"
  phone       = "+4915112345678"
  description = "Managing Director — Ironforge GmbH, Berlin"

  address {
    line1       = "Friedrichstraße 68"
    line2       = "5. OG"
    city        = "Berlin"
    state       = "Berlin"
    postal_code = "10117"
    country     = "DE"
  }

  shipping {
    name  = "Marcus Weber"
    phone = "+4915112345678"
    address {
      line1       = "Friedrichstraße 68"
      line2       = "5. OG"
      city        = "Berlin"
      state       = "Berlin"
      postal_code = "10117"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0011"

  metadata = {
    company   = "Ironforge GmbH"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_12" {
  name        = "Isabella Rossi"
  email       = "isabella.rossi@terraflux.it"
  phone       = "+393401234567"
  description = "Operations Manager — TerraFlux S.r.l., Milan"

  address {
    line1       = "Via Monte Napoleone 8"
    city        = "Milano"
    state       = "MI"
    postal_code = "20121"
    country     = "IT"
  }

  shipping {
    name  = "Isabella Rossi"
    phone = "+393401234567"
    address {
      line1       = "Via Monte Napoleone 8"
      city        = "Milano"
      state       = "MI"
      postal_code = "20121"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0012"

  metadata = {
    company   = "TerraFlux S.r.l."
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_13" {
  name        = "Daniel Kim"
  email       = "daniel.kim@quantumleap.co"
  phone       = "+12065550113"
  description = "Co-founder — QuantumLeap, Seattle-based AI startup"

  address {
    line1       = "400 Broad Street"
    city        = "Seattle"
    state       = "WA"
    postal_code = "98109"
    country     = "US"
  }

  shipping {
    name  = "Daniel Kim"
    phone = "+12065550113"
    address {
      line1       = "400 Broad Street"
      city        = "Seattle"
      state       = "WA"
      postal_code = "98109"
      country     = "US"
    }
  }

  preferred_locales = ["en", "ko"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0013"

  metadata = {
    company   = "QuantumLeap"
    plan      = "startup"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_14" {
  name        = "Fatima Al-Hassan"
  email       = "fatima.alhassan@oasispay.ae"
  phone       = "+971501234567"
  description = "Head of Payments — OasisPay, Dubai fintech"

  address {
    line1       = "Dubai Internet City"
    line2       = "Building 1, Office 403"
    city        = "Dubai"
    postal_code = "500001"
    country     = "AE"
  }

  shipping {
    name  = "Fatima Al-Hassan"
    phone = "+971501234567"
    address {
      line1       = "Dubai Internet City"
      line2       = "Building 1, Office 403"
      city        = "Dubai"
      postal_code = "500001"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0014"

  metadata = {
    company   = "OasisPay"
    plan      = "enterprise"
    sales_rep = "rtan"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_15" {
  name        = "Lucas Andersen"
  email       = "lucas.andersen@wavecrestlabs.dk"
  phone       = "+4520123456"
  description = "Lead Developer — Wavecrest Labs, Copenhagen"

  address {
    line1       = "Nyhavn 63A"
    city        = "København K"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Lucas Andersen"
    phone = "+4520123456"
    address {
      line1       = "Nyhavn 63A"
      city        = "København K"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0015"

  metadata = {
    company   = "Wavecrest Labs"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_16" {
  name        = "Grace Liu"
  email       = "grace.liu@cirrusanalytics.com.au"
  phone       = "+61412345678"
  description = "Data Science Lead — Cirrus Analytics, Sydney"

  address {
    line1       = "1 Macquarie Place"
    line2       = "Level 18"
    city        = "Sydney"
    state       = "NSW"
    postal_code = "2000"
    country     = "AU"
  }

  shipping {
    name  = "Grace Liu"
    phone = "+61412345678"
    address {
      line1       = "1 Macquarie Place"
      line2       = "Level 18"
      city        = "Sydney"
      state       = "NSW"
      postal_code = "2000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0016"

  metadata = {
    company   = "Cirrus Analytics"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_17" {
  name        = "Rafael Costa"
  email       = "rafael.costa@solarwindhq.pt"
  phone       = "+351912345678"
  description = "CEO — SolarWind HQ, Lisbon-based climate tech"

  address {
    line1       = "Rua Augusta 274"
    line2       = "2º Andar"
    city        = "Lisboa"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Rafael Costa"
    phone = "+351912345678"
    address {
      line1       = "Rua Augusta 274"
      line2       = "2º Andar"
      city        = "Lisboa"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0017"

  metadata = {
    company   = "SolarWind HQ"
    plan      = "startup"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_18" {
  name        = "Hannah Kowalski"
  email       = "hannah.kowalski@blueprintops.pl"
  phone       = "+48501234567"
  description = "Operations Director — BlueprintOps, Warsaw"

  address {
    line1       = "ul. Marszałkowska 27/35"
    city        = "Warszawa"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Hannah Kowalski"
    phone = "+48501234567"
    address {
      line1       = "ul. Marszałkowska 27/35"
      city        = "Warszawa"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0018"

  metadata = {
    company   = "BlueprintOps"
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_19" {
  name        = "Alexander Petrov"
  email       = "alex.petrov@codezenith.io"
  phone       = "+17185550119"
  description = "Staff Engineer — CodeZenith, freelance enterprise consultant"

  address {
    line1       = "55 Water Street"
    line2       = "Apt 14G"
    city        = "Brooklyn"
    state       = "NY"
    postal_code = "11201"
    country     = "US"
  }

  shipping {
    name  = "Alexander Petrov"
    phone = "+17185550119"
    address {
      line1       = "55 Water Street"
      line2       = "Apt 14G"
      city        = "Brooklyn"
      state       = "NY"
      postal_code = "11201"
      country     = "US"
    }
  }

  preferred_locales = ["en", "ru"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0019"

  metadata = {
    company   = "CodeZenith"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_20" {
  name        = "Mei-Ling Chen"
  email       = "meiling.chen@jadepathventures.tw"
  phone       = "+886912345678"
  description = "Managing Partner — JadePath Ventures, Taipei"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "88F Taipei 101"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Mei-Ling Chen"
    phone = "+886912345678"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "88F Taipei 101"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0020"

  metadata = {
    company   = "JadePath Ventures"
    plan      = "enterprise"
    sales_rep = "rtan"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0021" {
  name        = "Lily Rahman"
  email       = "lily.rahman@xpanse.dev"
  phone       = "+5518196001338"
  description = "Xpanse AB — Security Lead, zero-trust implementation"

  address {
    line1       = "Av. Paulista 1578"
    line2       = "Apt 6E"
    city        = "Sao Paulo"
    state       = "SP"
    postal_code = "01310-200"
    country     = "BR"
  }

  shipping {
    name  = "Lily Rahman"
    phone = "+5518196001338"
    address {
      line1       = "Av. Paulista 1578"
      line2       = "Apt 6E"
      city        = "Sao Paulo"
      state       = "SP"
      postal_code = "01310-200"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0021"

  metadata = {
    company   = "Xpanse AB"
    plan      = "pro"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0022" {
  name        = "Vikram Alvarez"
  email       = "vikram.alvarez@elevate.dev"
  phone       = "+64654235116"
  description = "Elevate AB — Head of Engineering, annual contract"

  address {
    line1       = "23 Customs Street East"
    line2       = "Suite 300"
    city        = "Auckland"
    state       = "Auckland"
    postal_code = "1010"
    country     = "NZ"
  }

  shipping {
    name  = "Vikram Alvarez"
    phone = "+64654235116"
    address {
      line1       = "23 Customs Street East"
      line2       = "Suite 300"
      city        = "Auckland"
      state       = "Auckland"
      postal_code = "1010"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0022"

  metadata = {
    company   = "Elevate AB"
    plan      = "business"
    sales_rep = "rtan"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0023" {
  name        = "Rina Zhou"
  email       = "rina.zhou@cirrusanalytics.net"
  phone       = "+824959310341"
  description = "Cirrus Analytics Ventures — Co-founder, Series A funded"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Apt 3B"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Rina Zhou"
    phone = "+824959310341"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Apt 3B"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0023"

  metadata = {
    company   = "Cirrus Analytics Ventures"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0024" {
  name        = "Aurora Becker"
  email       = "aurora.becker@zenithops.io"
  phone       = "+529283276483"
  description = "ZenithOps B.V. — Frontend Lead, design system migration"

  address {
    line1       = "Av. Vallarta 2440"
    line2       = "Office 404"
    city        = "Guadalajara"
    state       = "Jalisco"
    postal_code = "44100"
    country     = "MX"
  }

  shipping {
    name  = "Aurora Becker"
    phone = "+529283276483"
    address {
      line1       = "Av. Vallarta 2440"
      line2       = "Office 404"
      city        = "Guadalajara"
      state       = "Jalisco"
      postal_code = "44100"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0024"

  metadata = {
    company   = "ZenithOps B.V."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0025" {
  name        = "Fiona Stewart"
  email       = "fiona.stewart@skybridgecorp.co"
  phone       = "+437672423884"
  description = "SkyBridge Corp B.V. — Product Manager, workflow automation"

  address {
    line1       = "Graben 21"
    line2       = "Floor 8"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Fiona Stewart"
    phone = "+437672423884"
    address {
      line1       = "Graben 21"
      line2       = "Floor 8"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0025"

  metadata = {
    company   = "SkyBridge Corp B.V."
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0026" {
  name        = "Ali Chopra"
  email       = "ali.chopra@terraflux.dev"
  phone       = "+442691669784"
  description = "TerraFlux Group — Platform Engineer, infrastructure modernization"

  address {
    line1       = "1 Poultry"
    line2       = "Office 101"
    city        = "London"
    state       = "England"
    postal_code = "EC2V 8AS"
    country     = "GB"
  }

  shipping {
    name  = "Ali Chopra"
    phone = "+442691669784"
    address {
      line1       = "1 Poultry"
      line2       = "Office 101"
      city        = "London"
      state       = "England"
      postal_code = "EC2V 8AS"
      country     = "GB"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0026"

  metadata = {
    company   = "TerraFlux Group"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0027" {
  name        = "Lars Rodriguez"
  email       = "lars.rodriguez@rapidscale.com"
  phone       = "+61482814893"
  description = "RapidScale ApS — CTO, SaaS company scaling rapidly"

  address {
    line1       = "120 Collins Street"
    line2       = "Suite 100"
    city        = "Melbourne"
    state       = "VIC"
    postal_code = "3000"
    country     = "AU"
  }

  shipping {
    name  = "Lars Rodriguez"
    phone = "+61482814893"
    address {
      line1       = "120 Collins Street"
      line2       = "Suite 100"
      city        = "Melbourne"
      state       = "VIC"
      postal_code = "3000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0027"

  metadata = {
    company   = "RapidScale ApS"
    plan      = "pro"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0028" {
  name        = "Amira Shah"
  email       = "amira.shah@nordiqflow.app"
  phone       = "+433039117182"
  description = "NordiqFlow Corp. — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Graben 21"
    line2       = "Building A"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Amira Shah"
    phone = "+433039117182"
    address {
      line1       = "Graben 21"
      line2       = "Building A"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0028"

  metadata = {
    company   = "NordiqFlow Corp."
    plan      = "pro"
    sales_rep = "slee"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0029" {
  name        = "Haruto Xu"
  email       = "haruto.xu@zenith.app"
  phone       = "+576578713315"
  description = "Zenith Labs — Enterprise client, onboarded Q4 2024"

  address {
    line1       = "Carrera 7 No. 71-52"
    line2       = "Suite 400"
    city        = "Bogota"
    state       = "Cundinamarca"
    postal_code = "110111"
    country     = "CO"
  }

  shipping {
    name  = "Haruto Xu"
    phone = "+576578713315"
    address {
      line1       = "Carrera 7 No. 71-52"
      line2       = "Suite 400"
      city        = "Bogota"
      state       = "Cundinamarca"
      postal_code = "110111"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0029"

  metadata = {
    company   = "Zenith Labs"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0030" {
  name        = "Kavita Kowalski"
  email       = "kavita.kowalski@sable.io"
  phone       = "+4783473829"
  description = "Sable LLC — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Floor 20"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Kavita Kowalski"
    phone = "+4783473829"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Floor 20"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0030"

  metadata = {
    company   = "Sable LLC"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0031" {
  name        = "Leo Jones"
  email       = "leo.jones@northstar.ai"
  phone       = "+46701065133"
  description = "Northstar ApS — Operations Director, multi-year deal"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Office 101"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Leo Jones"
    phone = "+46701065133"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Office 101"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0031"

  metadata = {
    company   = "Northstar ApS"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0032" {
  name        = "Yuto Parker"
  email       = "yuto.parker@orchid.net"
  phone       = "+4910801326773"
  description = "Orchid Ventures — CEO, climate tech innovator"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Apt 4C"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Yuto Parker"
    phone = "+4910801326773"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Apt 4C"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0032"

  metadata = {
    company   = "Orchid Ventures"
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0033" {
  name        = "Celine Jimenez"
  email       = "celine.jimenez@quantumbit.dev"
  phone       = "+573430980500"
  description = "QuantumBit ApS — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Floor 2"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Celine Jimenez"
    phone = "+573430980500"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Floor 2"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0033"

  metadata = {
    company   = "QuantumBit ApS"
    plan      = "pro"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0034" {
  name        = "Skylar Kowalski"
  email       = "skylar.kowalski@foundry.ai"
  phone       = "+521939909169"
  description = "Foundry Ltd. — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Paseo de la Reforma 250"
    line2       = "Unit C"
    city        = "Mexico City"
    state       = "CDMX"
    postal_code = "06600"
    country     = "MX"
  }

  shipping {
    name  = "Skylar Kowalski"
    phone = "+521939909169"
    address {
      line1       = "Paseo de la Reforma 250"
      line2       = "Unit C"
      city        = "Mexico City"
      state       = "CDMX"
      postal_code = "06600"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0034"

  metadata = {
    company   = "Foundry Ltd."
    plan      = "business"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0035" {
  name        = "Celine Laurent"
  email       = "celine.laurent@solarwindhq.cloud"
  phone       = "+972510799118"
  description = "SolarWind HQ Systems — Operations Director, multi-year deal"

  address {
    line1       = "HaMasger St 30"
    line2       = "Unit C"
    city        = "Herzliya"
    postal_code = "4672815"
    country     = "IL"
  }

  shipping {
    name  = "Celine Laurent"
    phone = "+972510799118"
    address {
      line1       = "HaMasger St 30"
      line2       = "Unit C"
      city        = "Herzliya"
      postal_code = "4672815"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0035"

  metadata = {
    company   = "SolarWind HQ Systems"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0036" {
  name        = "Ewa Cook"
  email       = "ewa.cook@axiomdata.org"
  phone       = "+358808412411"
  description = "Axiom Data Oy — Product Manager, workflow automation"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Unit A"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Ewa Cook"
    phone = "+358808412411"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Unit A"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0036"

  metadata = {
    company   = "Axiom Data Oy"
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0037" {
  name        = "Sigrid Hall"
  email       = "sigrid.hall@quantum.net"
  phone       = "+4774016400"
  description = "Quantum Solutions — Lead Developer, technical evaluation"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Level 9"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Sigrid Hall"
    phone = "+4774016400"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Level 9"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0037"

  metadata = {
    company   = "Quantum Solutions"
    plan      = "business"
    sales_rep = "twright"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0038" {
  name        = "Luca Jung"
  email       = "luca.jung@vortexlabs.net"
  phone       = "+4905982620450"
  description = "Vortex Labs Corp. — Data Science Lead, analytics use case"

  address {
    line1       = "Marienplatz 1"
    line2       = "Apt 2A"
    city        = "Munich"
    state       = "Bavaria"
    postal_code = "80331"
    country     = "DE"
  }

  shipping {
    name  = "Luca Jung"
    phone = "+4905982620450"
    address {
      line1       = "Marienplatz 1"
      line2       = "Apt 2A"
      city        = "Munich"
      state       = "Bavaria"
      postal_code = "80331"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0038"

  metadata = {
    company   = "Vortex Labs Corp."
    plan      = "pro"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0039" {
  name        = "Samir Fournier"
  email       = "samir.fournier@beacon.co"
  phone       = "+56226025634"
  description = "Beacon Technologies — VP of Product, expanding to new markets"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Unit B"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Samir Fournier"
    phone = "+56226025634"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Unit B"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0039"

  metadata = {
    company   = "Beacon Technologies"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0040" {
  name        = "Hiroshi Hernandez"
  email       = "hiroshi.hernandez@yieldmax.co"
  phone       = "+358036541458"
  description = "YieldMax S.r.l. — CEO, climate tech innovator"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 15"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Hiroshi Hernandez"
    phone = "+358036541458"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 15"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0040"

  metadata = {
    company   = "YieldMax S.r.l."
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0041" {
  name        = "Ebba Reyes"
  email       = "ebba.reyes@luminarestudio.tech"
  phone       = "+971569816934"
  description = "Luminare Studio Corp. — Startup founder, early adopter program"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Floor 20"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Ebba Reyes"
    phone = "+971569816934"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Floor 20"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0041"

  metadata = {
    company   = "Luminare Studio Corp."
    plan      = "starter"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0042" {
  name        = "Krzysztof Fernandez"
  email       = "krzysztof.fernandez@skybridgecorp.org"
  phone       = "+435148465648"
  description = "SkyBridge Corp Systems — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Graben 21"
    line2       = "Floor 15"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Krzysztof Fernandez"
    phone = "+435148465648"
    address {
      line1       = "Graben 21"
      line2       = "Floor 15"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0042"

  metadata = {
    company   = "SkyBridge Corp Systems"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0043" {
  name        = "Elsa Reed"
  email       = "elsa.reed@fusiongrid.app"
  phone       = "+358436995777"
  description = "FusionGrid SAS — Frontend Lead, design system migration"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 2"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Elsa Reed"
    phone = "+358436995777"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 2"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0043"

  metadata = {
    company   = "FusionGrid SAS"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0044" {
  name        = "Heidi Zhang"
  email       = "heidi.zhang@northstar.io"
  phone       = "+971343320037"
  description = "Northstar Solutions — Security Lead, zero-trust implementation"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Floor 20"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Heidi Zhang"
    phone = "+971343320037"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Floor 20"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0044"

  metadata = {
    company   = "Northstar Solutions"
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0045" {
  name        = "Nikolai Chopra"
  email       = "nikolai.chopra@fusiongrid.io"
  phone       = "+816328708317"
  description = "FusionGrid Pty Ltd — CTO, SaaS company scaling rapidly"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Tower 3"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Nikolai Chopra"
    phone = "+816328708317"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Tower 3"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0045"

  metadata = {
    company   = "FusionGrid Pty Ltd"
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0046" {
  name        = "Luca Park"
  email       = "luca.park@lambdacore.cloud"
  phone       = "+61743487347"
  description = "LambdaCore Platform — Product lead, migrated from competitor"

  address {
    line1       = "100 Eagle Street"
    line2       = "Office 404"
    city        = "Brisbane"
    state       = "QLD"
    postal_code = "4000"
    country     = "AU"
  }

  shipping {
    name  = "Luca Park"
    phone = "+61743487347"
    address {
      line1       = "100 Eagle Street"
      line2       = "Office 404"
      city        = "Brisbane"
      state       = "QLD"
      postal_code = "4000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0046"

  metadata = {
    company   = "LambdaCore Platform"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0047" {
  name        = "Kwesi Smith"
  email       = "kwesi.smith@blueprintops.dev"
  phone       = "+5531665876036"
  description = "BlueprintOps GmbH — CEO, climate tech innovator"

  address {
    line1       = "Av. Rio Branco 156"
    line2       = "Apt 2A"
    city        = "Rio de Janeiro"
    state       = "RJ"
    postal_code = "20040-020"
    country     = "BR"
  }

  shipping {
    name  = "Kwesi Smith"
    phone = "+5531665876036"
    address {
      line1       = "Av. Rio Branco 156"
      line2       = "Apt 2A"
      city        = "Rio de Janeiro"
      state       = "RJ"
      postal_code = "20040-020"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0047"

  metadata = {
    company   = "BlueprintOps GmbH"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0048" {
  name        = "Diego Kozlov"
  email       = "diego.kozlov@deltaprime.net"
  phone       = "+41893734670"
  description = "DeltaPrime Software — CEO, climate tech innovator"

  address {
    line1       = "Rue du Rhone 50"
    line2       = "Building C"
    city        = "Geneva"
    state       = "GE"
    postal_code = "1201"
    country     = "CH"
  }

  shipping {
    name  = "Diego Kozlov"
    phone = "+41893734670"
    address {
      line1       = "Rue du Rhone 50"
      line2       = "Building C"
      city        = "Geneva"
      state       = "GE"
      postal_code = "1201"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0048"

  metadata = {
    company   = "DeltaPrime Software"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0049" {
  name        = "Addison Lundberg"
  email       = "addison.lundberg@wavesync.org"
  phone       = "+439016272046"
  description = "WaveSync Inc. — Lead Developer, technical evaluation"

  address {
    line1       = "Graben 21"
    line2       = "Apt 4C"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Addison Lundberg"
    phone = "+439016272046"
    address {
      line1       = "Graben 21"
      line2       = "Apt 4C"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0049"

  metadata = {
    company   = "WaveSync Inc."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0050" {
  name        = "Klaus Kozlov"
  email       = "klaus.kozlov@yonder.io"
  phone       = "+34708053100"
  description = "Yonder Consulting — Co-founder, Series A funded"

  address {
    line1       = "Passeig de Gracia 11"
    line2       = "Unit C"
    city        = "Barcelona"
    state       = "Catalonia"
    postal_code = "08002"
    country     = "ES"
  }

  shipping {
    name  = "Klaus Kozlov"
    phone = "+34708053100"
    address {
      line1       = "Passeig de Gracia 11"
      line2       = "Unit C"
      city        = "Barcelona"
      state       = "Catalonia"
      postal_code = "08002"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0050"

  metadata = {
    company   = "Yonder Consulting"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0051" {
  name        = "Asher Singh"
  email       = "asher.singh@outlook.cloud"
  phone       = "+351452991241"
  description = "Outlook Corp. — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Apt 5D"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Asher Singh"
    phone = "+351452991241"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Apt 5D"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0051"

  metadata = {
    company   = "Outlook Corp."
    plan      = "business"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0052" {
  name        = "Suki Chen"
  email       = "suki.chen@elevate.io"
  phone       = "+358491905865"
  description = "Elevate Digital — Product lead, migrated from competitor"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 3"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Suki Chen"
    phone = "+358491905865"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 3"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0052"

  metadata = {
    company   = "Elevate Digital"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0053" {
  name        = "Beatriz Schneider"
  email       = "beatriz.schneider@keystone.dev"
  phone       = "+358628498776"
  description = "Keystone Platform — Product Manager, workflow automation"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Office 101"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Beatriz Schneider"
    phone = "+358628498776"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Office 101"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0053"

  metadata = {
    company   = "Keystone Platform"
    plan      = "business"
    sales_rep = "akim"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0054" {
  name        = "Kenji Diaz"
  email       = "kenji.diaz@zenith.tech"
  phone       = "+351075273545"
  description = "Zenith Oy — Managing Director, long-term partnership"

  address {
    line1       = "Rua de Santa Catarina 112"
    line2       = "Floor 2"
    city        = "Porto"
    postal_code = "4000-322"
    country     = "PT"
  }

  shipping {
    name  = "Kenji Diaz"
    phone = "+351075273545"
    address {
      line1       = "Rua de Santa Catarina 112"
      line2       = "Floor 2"
      city        = "Porto"
      postal_code = "4000-322"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0054"

  metadata = {
    company   = "Zenith Oy"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0055" {
  name        = "Xiu Asante"
  email       = "xiu.asante@gammaray.cloud"
  phone       = "+48770143634"
  description = "GammaRay A/S — Frontend Lead, design system migration"

  address {
    line1       = "ul. Marszalkowska 27"
    line2       = "Apt 2A"
    city        = "Warsaw"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Xiu Asante"
    phone = "+48770143634"
    address {
      line1       = "ul. Marszalkowska 27"
      line2       = "Apt 2A"
      city        = "Warsaw"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0055"

  metadata = {
    company   = "GammaRay A/S"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0056" {
  name        = "Valentina Volkov"
  email       = "valentina.volkov@zephyrcloud.app"
  phone       = "+46443135182"
  description = "ZephyrCloud Co. — Operations Director, multi-year deal"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Level 4"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Valentina Volkov"
    phone = "+46443135182"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Level 4"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0056"

  metadata = {
    company   = "ZephyrCloud Co."
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0057" {
  name        = "Fritz Garcia"
  email       = "fritz.garcia@jubilee.tech"
  phone       = "+6524082400"
  description = "Jubilee B.V. — Platform Engineer, infrastructure modernization"

  address {
    line1       = "1 Raffles Place"
    line2       = "Floor 3"
    city        = "Singapore"
    postal_code = "048616"
    country     = "SG"
  }

  shipping {
    name  = "Fritz Garcia"
    phone = "+6524082400"
    address {
      line1       = "1 Raffles Place"
      line2       = "Floor 3"
      city        = "Singapore"
      postal_code = "048616"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0057"

  metadata = {
    company   = "Jubilee B.V."
    plan      = "pro"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0058" {
  name        = "Aisha Jang"
  email       = "aisha.jang@quantumbit.tech"
  phone       = "+353204711671"
  description = "QuantumBit A/S — Chief Revenue Officer, revenue operations"

  address {
    line1       = "70 South Mall"
    line2       = "Office 303"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Aisha Jang"
    phone = "+353204711671"
    address {
      line1       = "70 South Mall"
      line2       = "Office 303"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0058"

  metadata = {
    company   = "QuantumBit A/S"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0059" {
  name        = "Aria Parker"
  email       = "aria.parker@cirrusanalytics.org"
  phone       = "+886993867749"
  description = "Cirrus Analytics SAS — Head of Payments, fintech integration"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Unit A"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Aria Parker"
    phone = "+886993867749"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Unit A"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0059"

  metadata = {
    company   = "Cirrus Analytics SAS"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0060" {
  name        = "Haruto Reyes"
  email       = "haruto.reyes@northstar.dev"
  phone       = "+61812067974"
  description = "Northstar Ltd. — Startup founder, early adopter program"

  address {
    line1       = "1 Macquarie Place"
    line2       = "Building C"
    city        = "Sydney"
    state       = "NSW"
    postal_code = "2000"
    country     = "AU"
  }

  shipping {
    name  = "Haruto Reyes"
    phone = "+61812067974"
    address {
      line1       = "1 Macquarie Place"
      line2       = "Building C"
      city        = "Sydney"
      state       = "NSW"
      postal_code = "2000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0060"

  metadata = {
    company   = "Northstar Ltd."
    plan      = "business"
    sales_rep = "rtan"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0061" {
  name        = "Mateo Almeida"
  email       = "mateo.almeida@jetstream.ai"
  phone       = "+911832421024"
  description = "JetStream Ventures — Security Lead, zero-trust implementation"

  address {
    line1       = "Nariman Point"
    line2       = "Office 303"
    city        = "Mumbai"
    state       = "Maharashtra"
    postal_code = "400001"
    country     = "IN"
  }

  shipping {
    name  = "Mateo Almeida"
    phone = "+911832421024"
    address {
      line1       = "Nariman Point"
      line2       = "Office 303"
      city        = "Mumbai"
      state       = "Maharashtra"
      postal_code = "400001"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0061"

  metadata = {
    company   = "JetStream Ventures"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0062" {
  name        = "Sean Morris"
  email       = "sean.morris@stellarops.io"
  phone       = "+353906594013"
  description = "StellarOps SAS — Frontend Lead, design system migration"

  address {
    line1       = "70 South Mall"
    line2       = "Floor 15"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Sean Morris"
    phone = "+353906594013"
    address {
      line1       = "70 South Mall"
      line2       = "Floor 15"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0062"

  metadata = {
    company   = "StellarOps SAS"
    plan      = "business"
    sales_rep = "jchen"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0063" {
  name        = "Chen Li"
  email       = "chen.li@meridian.dev"
  phone       = "+439671756551"
  description = "Meridian Oy — VP of Product, expanding to new markets"

  address {
    line1       = "Graben 21"
    line2       = "Office 202"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Chen Li"
    phone = "+439671756551"
    address {
      line1       = "Graben 21"
      line2       = "Office 202"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0063"

  metadata = {
    company   = "Meridian Oy"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0064" {
  name        = "Fiona Popov"
  email       = "fiona.popov@zephyrcloud.tech"
  phone       = "+394516808760"
  description = "ZephyrCloud LLC — Operations Director, multi-year deal"

  address {
    line1       = "Via Monte Napoleone 8"
    line2       = "Suite 400"
    city        = "Milano"
    state       = "MI"
    postal_code = "20121"
    country     = "IT"
  }

  shipping {
    name  = "Fiona Popov"
    phone = "+394516808760"
    address {
      line1       = "Via Monte Napoleone 8"
      line2       = "Suite 400"
      city        = "Milano"
      state       = "MI"
      postal_code = "20121"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0064"

  metadata = {
    company   = "ZephyrCloud LLC"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0065" {
  name        = "Kenji Stewart"
  email       = "kenji.stewart@zephyrcloud.cloud"
  phone       = "+437109324808"
  description = "ZephyrCloud GmbH — Head of Payments, fintech integration"

  address {
    line1       = "Graben 21"
    line2       = "Floor 5"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Kenji Stewart"
    phone = "+437109324808"
    address {
      line1       = "Graben 21"
      line2       = "Floor 5"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0065"

  metadata = {
    company   = "ZephyrCloud GmbH"
    plan      = "pro"
    sales_rep = "twright"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0066" {
  name        = "Jace Bhat"
  email       = "jace.bhat@wander.app"
  phone       = "+6567737826"
  description = "Wander Digital — Operations Director, multi-year deal"

  address {
    line1       = "1 Fusionopolis Walk"
    line2       = "Office 505"
    city        = "Singapore"
    postal_code = "138589"
    country     = "SG"
  }

  shipping {
    name  = "Jace Bhat"
    phone = "+6567737826"
    address {
      line1       = "1 Fusionopolis Walk"
      line2       = "Office 505"
      city        = "Singapore"
      postal_code = "138589"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0066"

  metadata = {
    company   = "Wander Digital"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0067" {
  name        = "Pallavi Stewart"
  email       = "pallavi.stewart@indie.app"
  phone       = "+6599727875"
  description = "Indie Inc. — Lead Developer, technical evaluation"

  address {
    line1       = "1 Fusionopolis Walk"
    line2       = "Unit C"
    city        = "Singapore"
    postal_code = "138589"
    country     = "SG"
  }

  shipping {
    name  = "Pallavi Stewart"
    phone = "+6599727875"
    address {
      line1       = "1 Fusionopolis Walk"
      line2       = "Unit C"
      city        = "Singapore"
      postal_code = "138589"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0067"

  metadata = {
    company   = "Indie Inc."
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0068" {
  name        = "Axel Richter"
  email       = "axel.richter@jetstream.com"
  phone       = "+886576627028"
  description = "JetStream Software — Chief Revenue Officer, revenue operations"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Level 4"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Axel Richter"
    phone = "+886576627028"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Level 4"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0068"

  metadata = {
    company   = "JetStream Software"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0069" {
  name        = "Momo Patel"
  email       = "momo.patel@vertex.io"
  phone       = "+34745961586"
  description = "Vertex GmbH — Lead Developer, technical evaluation"

  address {
    line1       = "Paseo de la Castellana 89"
    line2       = "Unit C"
    city        = "Madrid"
    state       = "Madrid"
    postal_code = "28014"
    country     = "ES"
  }

  shipping {
    name  = "Momo Patel"
    phone = "+34745961586"
    address {
      line1       = "Paseo de la Castellana 89"
      line2       = "Unit C"
      city        = "Madrid"
      state       = "Madrid"
      postal_code = "28014"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0069"

  metadata = {
    company   = "Vertex GmbH"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0070" {
  name        = "Petra Gomez"
  email       = "petra.gomez@yellowbrick.io"
  phone       = "+34724005045"
  description = "Yellowbrick Ltd. — Data Science Lead, analytics use case"

  address {
    line1       = "Paseo de la Castellana 89"
    line2       = "Apt 6E"
    city        = "Madrid"
    state       = "Madrid"
    postal_code = "28014"
    country     = "ES"
  }

  shipping {
    name  = "Petra Gomez"
    phone = "+34724005045"
    address {
      line1       = "Paseo de la Castellana 89"
      line2       = "Apt 6E"
      city        = "Madrid"
      state       = "Madrid"
      postal_code = "28014"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0070"

  metadata = {
    company   = "Yellowbrick Ltd."
    plan      = "pro"
    sales_rep = "slee"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0071" {
  name        = "Lina Ferreira"
  email       = "lina.ferreira@echo.io"
  phone       = "+61969379237"
  description = "Echo S.A. — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "1 Macquarie Place"
    line2       = "Building C"
    city        = "Sydney"
    state       = "NSW"
    postal_code = "2000"
    country     = "AU"
  }

  shipping {
    name  = "Lina Ferreira"
    phone = "+61969379237"
    address {
      line1       = "1 Macquarie Place"
      line2       = "Building C"
      city        = "Sydney"
      state       = "NSW"
      postal_code = "2000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0071"

  metadata = {
    company   = "Echo S.A."
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0072" {
  name        = "Petra Souza"
  email       = "petra.souza@xylemtech.tech"
  phone       = "+4994647436713"
  description = "XylemTech S.A. — CEO, climate tech innovator"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Suite 200"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Petra Souza"
    phone = "+4994647436713"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Suite 200"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0072"

  metadata = {
    company   = "XylemTech S.A."
    plan      = "business"
    sales_rep = "rtan"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0073" {
  name        = "Declan Morales"
  email       = "declan.morales@vortexlabs.org"
  phone       = "+4774395339"
  description = "Vortex Labs Sp. z o.o. — Managing Director, long-term partnership"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Office 303"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Declan Morales"
    phone = "+4774395339"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Office 303"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0073"

  metadata = {
    company   = "Vortex Labs Sp. z o.o."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0074" {
  name        = "Camila Tanaka"
  email       = "camila.tanaka@daybreak.io"
  phone       = "+56456232858"
  description = "Daybreak AG — Growth Lead, high-velocity team"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Office 202"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Camila Tanaka"
    phone = "+56456232858"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Office 202"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0074"

  metadata = {
    company   = "Daybreak AG"
    plan      = "pro"
    sales_rep = "twright"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0075" {
  name        = "Freya Wilson"
  email       = "freya.wilson@neutronops.ai"
  phone       = "+818516048175"
  description = "NeutronOps Ltd. — Frontend Lead, design system migration"

  address {
    line1       = "2-21-1 Shibuya"
    line2       = "Floor 3"
    city        = "Shibuya-ku"
    state       = "Tokyo"
    postal_code = "150-0002"
    country     = "JP"
  }

  shipping {
    name  = "Freya Wilson"
    phone = "+818516048175"
    address {
      line1       = "2-21-1 Shibuya"
      line2       = "Floor 3"
      city        = "Shibuya-ku"
      state       = "Tokyo"
      postal_code = "150-0002"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0075"

  metadata = {
    company   = "NeutronOps Ltd."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0076" {
  name        = "Nisha Kumar"
  email       = "nisha.kumar@cascadehq.org"
  phone       = "+41317461200"
  description = "Cascade HQ Technologies — Staff Engineer, enterprise consultant"

  address {
    line1       = "Rue du Rhone 50"
    line2       = "Level 6"
    city        = "Geneva"
    state       = "GE"
    postal_code = "1201"
    country     = "CH"
  }

  shipping {
    name  = "Nisha Kumar"
    phone = "+41317461200"
    address {
      line1       = "Rue du Rhone 50"
      line2       = "Level 6"
      city        = "Geneva"
      state       = "GE"
      postal_code = "1201"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0076"

  metadata = {
    company   = "Cascade HQ Technologies"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0077" {
  name        = "Ellie Klein"
  email       = "ellie.klein@mesontech.org"
  phone       = "+522617964053"
  description = "MesonTech AG — Solutions Architect, custom deployment"

  address {
    line1       = "Av. Vallarta 2440"
    line2       = "Apt 3B"
    city        = "Guadalajara"
    state       = "Jalisco"
    postal_code = "44100"
    country     = "MX"
  }

  shipping {
    name  = "Ellie Klein"
    phone = "+522617964053"
    address {
      line1       = "Av. Vallarta 2440"
      line2       = "Apt 3B"
      city        = "Guadalajara"
      state       = "Jalisco"
      postal_code = "44100"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0077"

  metadata = {
    company   = "MesonTech AG"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0078" {
  name        = "Kojo Cerny"
  email       = "kojo.cerny@zenithops.co"
  phone       = "+821713900532"
  description = "ZenithOps LLC — Chief Revenue Officer, revenue operations"

  address {
    line1       = "55 Jungang-daero, Jung-gu"
    line2       = "Level 14"
    city        = "Busan"
    state       = "Busan"
    postal_code = "48058"
    country     = "KR"
  }

  shipping {
    name  = "Kojo Cerny"
    phone = "+821713900532"
    address {
      line1       = "55 Jungang-daero, Jung-gu"
      line2       = "Level 14"
      city        = "Busan"
      state       = "Busan"
      postal_code = "48058"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0078"

  metadata = {
    company   = "ZenithOps LLC"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0079" {
  name        = "Ravi Phillips"
  email       = "ravi.phillips@warpdrive.app"
  phone       = "+812284210205"
  description = "WarpDrive Group — Co-founder, Series A funded"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Suite 400"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Ravi Phillips"
    phone = "+812284210205"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Suite 400"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0079"

  metadata = {
    company   = "WarpDrive Group"
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0080" {
  name        = "Asher Adjei"
  email       = "asher.adjei@helixdata.cloud"
  phone       = "+33758917839"
  description = "HelixData KG — Startup founder, early adopter program"

  address {
    line1       = "12 Avenue des Champs-Elysees"
    line2       = "Suite 400"
    city        = "Paris"
    postal_code = "75008"
    country     = "FR"
  }

  shipping {
    name  = "Asher Adjei"
    phone = "+33758917839"
    address {
      line1       = "12 Avenue des Champs-Elysees"
      line2       = "Suite 400"
      city        = "Paris"
      postal_code = "75008"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0080"

  metadata = {
    company   = "HelixData KG"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0081" {
  name        = "Yang Leroy"
  email       = "yang.leroy@ionpath.cloud"
  phone       = "+33115921249"
  description = "IonPath Systems — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "1 Place du Capitole"
    line2       = "Office 202"
    city        = "Toulouse"
    postal_code = "31000"
    country     = "FR"
  }

  shipping {
    name  = "Yang Leroy"
    phone = "+33115921249"
    address {
      line1       = "1 Place du Capitole"
      line2       = "Office 202"
      city        = "Toulouse"
      postal_code = "31000"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0081"

  metadata = {
    company   = "IonPath Systems"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0082" {
  name        = "Ren Rao"
  email       = "ren.rao@glyph.net"
  phone       = "+33367365766"
  description = "Glyph ApS — Product Manager, workflow automation"

  address {
    line1       = "12 Avenue des Champs-Elysees"
    line2       = "Unit D"
    city        = "Paris"
    postal_code = "75008"
    country     = "FR"
  }

  shipping {
    name  = "Ren Rao"
    phone = "+33367365766"
    address {
      line1       = "12 Avenue des Champs-Elysees"
      line2       = "Unit D"
      city        = "Paris"
      postal_code = "75008"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0082"

  metadata = {
    company   = "Glyph ApS"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0083" {
  name        = "Anastasia Young"
  email       = "anastasia.young@quantum.io"
  phone       = "+353116152809"
  description = "Quantum Ventures — Platform Engineer, infrastructure modernization"

  address {
    line1       = "32 Merrion Square"
    line2       = "Building A"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Anastasia Young"
    phone = "+353116152809"
    address {
      line1       = "32 Merrion Square"
      line2       = "Building A"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0083"

  metadata = {
    company   = "Quantum Ventures"
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0084" {
  name        = "Jacob Rogers"
  email       = "jacob.rogers@foundry.org"
  phone       = "+46832731585"
  description = "Foundry S.r.l. — Head of Engineering, annual contract"

  address {
    line1       = "Kungsgatan 44"
    line2       = "Level 9"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Jacob Rogers"
    phone = "+46832731585"
    address {
      line1       = "Kungsgatan 44"
      line2       = "Level 9"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0084"

  metadata = {
    company   = "Foundry S.r.l."
    plan      = "pro"
    sales_rep = "slee"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0085" {
  name        = "Fatima Gustafsson"
  email       = "fatima.gustafsson@vivid.com"
  phone       = "+358244550229"
  description = "Vivid Systems — Frontend Lead, design system migration"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 2"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Fatima Gustafsson"
    phone = "+358244550229"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 2"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0085"

  metadata = {
    company   = "Vivid Systems"
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0086" {
  name        = "Ama Mitchell"
  email       = "ama.mitchell@coresync.dev"
  phone       = "+395459910229"
  description = "CoreSync ApS — Startup founder, early adopter program"

  address {
    line1       = "Via del Corso 300"
    line2       = "Tower 2"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Ama Mitchell"
    phone = "+395459910229"
    address {
      line1       = "Via del Corso 300"
      line2       = "Tower 2"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0086"

  metadata = {
    company   = "CoreSync ApS"
    plan      = "business"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0087" {
  name        = "Henrique Bonnet"
  email       = "henrique.bonnet@opticore.tech"
  phone       = "+886614978403"
  description = "OptiCore B.V. — CEO, climate tech innovator"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Unit A"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Henrique Bonnet"
    phone = "+886614978403"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Unit A"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0087"

  metadata = {
    company   = "OptiCore B.V."
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0088" {
  name        = "Luke Kuznetsov"
  email       = "luke.kuznetsov@mindforge.com"
  phone       = "+31762268388"
  description = "MindForge S.r.l. — Frontend Lead, design system migration"

  address {
    line1       = "Dam 1"
    line2       = "Building A"
    city        = "Amsterdam"
    state       = "North Holland"
    postal_code = "1012 JS"
    country     = "NL"
  }

  shipping {
    name  = "Luke Kuznetsov"
    phone = "+31762268388"
    address {
      line1       = "Dam 1"
      line2       = "Building A"
      city        = "Amsterdam"
      state       = "North Holland"
      postal_code = "1012 JS"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0088"

  metadata = {
    company   = "MindForge S.r.l."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0089" {
  name        = "Priya Hernandez"
  email       = "priya.hernandez@unison.org"
  phone       = "+4769664160"
  description = "Unison Ltd. — Lead Developer, technical evaluation"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Floor 2"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Priya Hernandez"
    phone = "+4769664160"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Floor 2"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0089"

  metadata = {
    company   = "Unison Ltd."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0090" {
  name        = "Mariana Davis"
  email       = "mariana.davis@lunarbyte.net"
  phone       = "+351164535218"
  description = "LunarByte ApS — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Rua de Santa Catarina 112"
    line2       = "Floor 10"
    city        = "Porto"
    postal_code = "4000-322"
    country     = "PT"
  }

  shipping {
    name  = "Mariana Davis"
    phone = "+351164535218"
    address {
      line1       = "Rua de Santa Catarina 112"
      line2       = "Floor 10"
      city        = "Porto"
      postal_code = "4000-322"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0090"

  metadata = {
    company   = "LunarByte ApS"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0091" {
  name        = "Wei Miller"
  email       = "wei.miller@codezenith.org"
  phone       = "+12127799799"
  description = "CodeZenith AB — Lead Developer, technical evaluation"

  address {
    line1       = "100 King Street West"
    line2       = "Tower 1"
    city        = "Toronto"
    state       = "ON"
    postal_code = "M5H 2N2"
    country     = "CA"
  }

  shipping {
    name  = "Wei Miller"
    phone = "+12127799799"
    address {
      line1       = "100 King Street West"
      line2       = "Tower 1"
      city        = "Toronto"
      state       = "ON"
      postal_code = "M5H 2N2"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0091"

  metadata = {
    company   = "CodeZenith AB"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0092" {
  name        = "Henrique Dvorak"
  email       = "henrique.dvorak@synapseio.tech"
  phone       = "+918147700541"
  description = "SynapseIO Partners — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Embassy Tech Village"
    line2       = "Level 9"
    city        = "Bengaluru"
    state       = "Karnataka"
    postal_code = "560103"
    country     = "IN"
  }

  shipping {
    name  = "Henrique Dvorak"
    phone = "+918147700541"
    address {
      line1       = "Embassy Tech Village"
      line2       = "Level 9"
      city        = "Bengaluru"
      state       = "Karnataka"
      postal_code = "560103"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0092"

  metadata = {
    company   = "SynapseIO Partners"
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0093" {
  name        = "Ava Ruiz"
  email       = "ava.ruiz@tidal.tech"
  phone       = "+351978207151"
  description = "Tidal Partners — Growth Lead, high-velocity team"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Building B"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Ava Ruiz"
    phone = "+351978207151"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Building B"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0093"

  metadata = {
    company   = "Tidal Partners"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0094" {
  name        = "Cyrus Yang"
  email       = "cyrus.yang@horizon.app"
  phone       = "+46665905151"
  description = "Horizon S.A. — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Floor 10"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Cyrus Yang"
    phone = "+46665905151"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Floor 10"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0094"

  metadata = {
    company   = "Horizon S.A."
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0095" {
  name        = "Olaf Smith"
  email       = "olaf.smith@daybreak.app"
  phone       = "+816291486528"
  description = "Daybreak Systems — Product lead, migrated from competitor"

  address {
    line1       = "3-1-1 Umeda, Kita-ku"
    line2       = "Office 303"
    city        = "Osaka"
    state       = "Osaka"
    postal_code = "530-0001"
    country     = "JP"
  }

  shipping {
    name  = "Olaf Smith"
    phone = "+816291486528"
    address {
      line1       = "3-1-1 Umeda, Kita-ku"
      line2       = "Office 303"
      city        = "Osaka"
      state       = "Osaka"
      postal_code = "530-0001"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0095"

  metadata = {
    company   = "Daybreak Systems"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0096" {
  name        = "Christian Campbell"
  email       = "christian.campbell@xenonlabs.co"
  phone       = "+353221418880"
  description = "XenonLabs Group — Frontend Lead, design system migration"

  address {
    line1       = "32 Merrion Square"
    line2       = "Floor 10"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Christian Campbell"
    phone = "+353221418880"
    address {
      line1       = "32 Merrion Square"
      line2       = "Floor 10"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0096"

  metadata = {
    company   = "XenonLabs Group"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0097" {
  name        = "Aurora Hill"
  email       = "aurora.hill@jubilee.cloud"
  phone       = "+886065379473"
  description = "Jubilee Digital — Platform Engineer, infrastructure modernization"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Apt 3B"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Aurora Hill"
    phone = "+886065379473"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Apt 3B"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0097"

  metadata = {
    company   = "Jubilee Digital"
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0098" {
  name        = "Axel Sanchez"
  email       = "axel.sanchez@neutronops.net"
  phone       = "+6586239240"
  description = "NeutronOps Group — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Level 4"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Axel Sanchez"
    phone = "+6586239240"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Level 4"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0098"

  metadata = {
    company   = "NeutronOps Group"
    plan      = "business"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0099" {
  name        = "Lillian Cook"
  email       = "lillian.cook@ironforge.cloud"
  phone       = "+61826137506"
  description = "Ironforge Group — Startup founder, early adopter program"

  address {
    line1       = "120 Collins Street"
    line2       = "Floor 2"
    city        = "Melbourne"
    state       = "VIC"
    postal_code = "3000"
    country     = "AU"
  }

  shipping {
    name  = "Lillian Cook"
    phone = "+61826137506"
    address {
      line1       = "120 Collins Street"
      line2       = "Floor 2"
      city        = "Melbourne"
      state       = "VIC"
      postal_code = "3000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0099"

  metadata = {
    company   = "Ironforge Group"
    plan      = "business"
    sales_rep = "msilva"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0100" {
  name        = "Anastasia Roberts"
  email       = "anastasia.roberts@cascadehq.tech"
  phone       = "+432204727790"
  description = "Cascade HQ Co. — Product lead, migrated from competitor"

  address {
    line1       = "Graben 21"
    line2       = "Level 9"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Anastasia Roberts"
    phone = "+432204727790"
    address {
      line1       = "Graben 21"
      line2       = "Level 9"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0100"

  metadata = {
    company   = "Cascade HQ Co."
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0101" {
  name        = "Kofi Lambert"
  email       = "kofi.lambert@wavecrestlabs.app"
  phone       = "+6510369711"
  description = "Wavecrest Labs Group — Director of IT, compliance focused"

  address {
    line1       = "1 Raffles Place"
    line2       = "Office 202"
    city        = "Singapore"
    postal_code = "048616"
    country     = "SG"
  }

  shipping {
    name  = "Kofi Lambert"
    phone = "+6510369711"
    address {
      line1       = "1 Raffles Place"
      line2       = "Office 202"
      city        = "Singapore"
      postal_code = "048616"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0101"

  metadata = {
    company   = "Wavecrest Labs Group"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0102" {
  name        = "Bianca Martinez"
  email       = "bianca.martinez@horizon.ai"
  phone       = "+5521851888880"
  description = "Horizon AG — CEO, climate tech innovator"

  address {
    line1       = "Av. Afonso Pena 1500"
    line2       = "Apt 3B"
    city        = "Belo Horizonte"
    state       = "MG"
    postal_code = "30130-003"
    country     = "BR"
  }

  shipping {
    name  = "Bianca Martinez"
    phone = "+5521851888880"
    address {
      line1       = "Av. Afonso Pena 1500"
      line2       = "Apt 3B"
      city        = "Belo Horizonte"
      state       = "MG"
      postal_code = "30130-003"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0102"

  metadata = {
    company   = "Horizon AG"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0103" {
  name        = "Ying Sokolov"
  email       = "ying.sokolov@nordiqflow.tech"
  phone       = "+64319520585"
  description = "NordiqFlow AG — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "23 Customs Street East"
    line2       = "Floor 15"
    city        = "Auckland"
    state       = "Auckland"
    postal_code = "1010"
    country     = "NZ"
  }

  shipping {
    name  = "Ying Sokolov"
    phone = "+64319520585"
    address {
      line1       = "23 Customs Street East"
      line2       = "Floor 15"
      city        = "Auckland"
      state       = "Auckland"
      postal_code = "1010"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0103"

  metadata = {
    company   = "NordiqFlow AG"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0104" {
  name        = "Ellie Costa"
  email       = "ellie.costa@upward.app"
  phone       = "+393030548687"
  description = "Upward Group — Managing Director, long-term partnership"

  address {
    line1       = "Via Monte Napoleone 8"
    line2       = "Suite 400"
    city        = "Milano"
    state       = "MI"
    postal_code = "20121"
    country     = "IT"
  }

  shipping {
    name  = "Ellie Costa"
    phone = "+393030548687"
    address {
      line1       = "Via Monte Napoleone 8"
      line2       = "Suite 400"
      city        = "Milano"
      state       = "MI"
      postal_code = "20121"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0104"

  metadata = {
    company   = "Upward Group"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0105" {
  name        = "Nour Morris"
  email       = "nour.morris@cirrusanalytics.ai"
  phone       = "+46765277584"
  description = "Cirrus Analytics Partners — Product lead, migrated from competitor"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Floor 15"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Nour Morris"
    phone = "+46765277584"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Floor 15"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0105"

  metadata = {
    company   = "Cirrus Analytics Partners"
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0106" {
  name        = "Afua Peterson"
  email       = "afua.peterson@velocloud.app"
  phone       = "+4947962757059"
  description = "VeloCloud Corp. — Head of Payments, fintech integration"

  address {
    line1       = "Jungfernstieg 7"
    line2       = "Apt 3B"
    city        = "Hamburg"
    state       = "Hamburg"
    postal_code = "20095"
    country     = "DE"
  }

  shipping {
    name  = "Afua Peterson"
    phone = "+4947962757059"
    address {
      line1       = "Jungfernstieg 7"
      line2       = "Apt 3B"
      city        = "Hamburg"
      state       = "Hamburg"
      postal_code = "20095"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0106"

  metadata = {
    company   = "VeloCloud Corp."
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0107" {
  name        = "Reza Sokolov"
  email       = "reza.sokolov@pinnacle.org"
  phone       = "+17021355690"
  description = "Pinnacle S.A. — Security Lead, zero-trust implementation"

  address {
    line1       = "200 Congress Avenue"
    line2       = "Building B"
    city        = "Austin"
    state       = "TX"
    postal_code = "78701"
    country     = "US"
  }

  shipping {
    name  = "Reza Sokolov"
    phone = "+17021355690"
    address {
      line1       = "200 Congress Avenue"
      line2       = "Building B"
      city        = "Austin"
      state       = "TX"
      postal_code = "78701"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0107"

  metadata = {
    company   = "Pinnacle S.A."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0108" {
  name        = "Scarlett Jang"
  email       = "scarlett.jang@blueprintops.tech"
  phone       = "+46431027868"
  description = "BlueprintOps KG — Head of Engineering, annual contract"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Unit A"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Scarlett Jang"
    phone = "+46431027868"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Unit A"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0108"

  metadata = {
    company   = "BlueprintOps KG"
    plan      = "business"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0109" {
  name        = "Wolfgang Ribeiro"
  email       = "wolfgang.ribeiro@unison.dev"
  phone       = "+11727155188"
  description = "Unison A/S — Staff Engineer, enterprise consultant"

  address {
    line1       = "100 King Street West"
    line2       = "Apt 3B"
    city        = "Toronto"
    state       = "ON"
    postal_code = "M5H 2N2"
    country     = "CA"
  }

  shipping {
    name  = "Wolfgang Ribeiro"
    phone = "+11727155188"
    address {
      line1       = "100 King Street West"
      line2       = "Apt 3B"
      city        = "Toronto"
      state       = "ON"
      postal_code = "M5H 2N2"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0109"

  metadata = {
    company   = "Unison A/S"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0110" {
  name        = "Ali Roberts"
  email       = "ali.roberts@cirrusanalytics.co"
  phone       = "+64705895782"
  description = "Cirrus Analytics B.V. — Security Lead, zero-trust implementation"

  address {
    line1       = "23 Customs Street East"
    line2       = "Tower 1"
    city        = "Auckland"
    state       = "Auckland"
    postal_code = "1010"
    country     = "NZ"
  }

  shipping {
    name  = "Ali Roberts"
    phone = "+64705895782"
    address {
      line1       = "23 Customs Street East"
      line2       = "Tower 1"
      city        = "Auckland"
      state       = "Auckland"
      postal_code = "1010"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0110"

  metadata = {
    company   = "Cirrus Analytics B.V."
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0111" {
  name        = "Nasrin Girard"
  email       = "nasrin.girard@bloom.dev"
  phone       = "+358517785289"
  description = "Bloom ApS — VP of Product, expanding to new markets"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 5"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Nasrin Girard"
    phone = "+358517785289"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 5"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0111"

  metadata = {
    company   = "Bloom ApS"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0112" {
  name        = "Parisa Young"
  email       = "parisa.young@synapseio.co"
  phone       = "+61584143842"
  description = "SynapseIO S.A. — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "120 Collins Street"
    line2       = "Level 14"
    city        = "Melbourne"
    state       = "VIC"
    postal_code = "3000"
    country     = "AU"
  }

  shipping {
    name  = "Parisa Young"
    phone = "+61584143842"
    address {
      line1       = "120 Collins Street"
      line2       = "Level 14"
      city        = "Melbourne"
      state       = "VIC"
      postal_code = "3000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0112"

  metadata = {
    company   = "SynapseIO S.A."
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0113" {
  name        = "Ebba Young"
  email       = "ebba.young@brightpath.org"
  phone       = "+971001094396"
  description = "BrightPath Systems — Security Lead, zero-trust implementation"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Office 202"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Ebba Young"
    phone = "+971001094396"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Office 202"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0113"

  metadata = {
    company   = "BrightPath Systems"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0114" {
  name        = "Pablo Reddy"
  email       = "pablo.reddy@lunarbyte.app"
  phone       = "+64710276773"
  description = "LunarByte Partners — Lead Developer, technical evaluation"

  address {
    line1       = "1 Willis Street"
    line2       = "Apt 2A"
    city        = "Wellington"
    state       = "Wellington"
    postal_code = "6011"
    country     = "NZ"
  }

  shipping {
    name  = "Pablo Reddy"
    phone = "+64710276773"
    address {
      line1       = "1 Willis Street"
      line2       = "Apt 2A"
      city        = "Wellington"
      state       = "Wellington"
      postal_code = "6011"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0114"

  metadata = {
    company   = "LunarByte Partners"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0115" {
  name        = "Connor Thomas"
  email       = "connor.thomas@aeris.tech"
  phone       = "+4537147321"
  description = "Aeris AG — Startup founder, early adopter program"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Unit C"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Connor Thomas"
    phone = "+4537147321"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Unit C"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0115"

  metadata = {
    company   = "Aeris AG"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0116" {
  name        = "Violet Takahashi"
  email       = "violet.takahashi@wander.co"
  phone       = "+56278774701"
  description = "Wander Sp. z o.o. — CEO, climate tech innovator"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Apt 2A"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Violet Takahashi"
    phone = "+56278774701"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Apt 2A"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0116"

  metadata = {
    company   = "Wander Sp. z o.o."
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0117" {
  name        = "Logan Kim"
  email       = "logan.kim@quantumbit.app"
  phone       = "+971801624565"
  description = "QuantumBit A/S — Startup founder, early adopter program"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Floor 20"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Logan Kim"
    phone = "+971801624565"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Floor 20"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0117"

  metadata = {
    company   = "QuantumBit A/S"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0118" {
  name        = "Weronika Lee"
  email       = "weronika.lee@quantumbit.net"
  phone       = "+824991216558"
  description = "QuantumBit Ltd. — Data Science Lead, analytics use case"

  address {
    line1       = "55 Jungang-daero, Jung-gu"
    line2       = "Apt 5D"
    city        = "Busan"
    state       = "Busan"
    postal_code = "48058"
    country     = "KR"
  }

  shipping {
    name  = "Weronika Lee"
    phone = "+824991216558"
    address {
      line1       = "55 Jungang-daero, Jung-gu"
      line2       = "Apt 5D"
      city        = "Busan"
      state       = "Busan"
      postal_code = "48058"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0118"

  metadata = {
    company   = "QuantumBit Ltd."
    plan      = "pro"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0119" {
  name        = "Vivek Weber"
  email       = "vivek.weber@greenfieldio.cloud"
  phone       = "+818729825952"
  description = "Greenfield.io LLC — CEO, climate tech innovator"

  address {
    line1       = "3-1-1 Umeda, Kita-ku"
    line2       = "Level 6"
    city        = "Osaka"
    state       = "Osaka"
    postal_code = "530-0001"
    country     = "JP"
  }

  shipping {
    name  = "Vivek Weber"
    phone = "+818729825952"
    address {
      line1       = "3-1-1 Umeda, Kita-ku"
      line2       = "Level 6"
      city        = "Osaka"
      state       = "Osaka"
      postal_code = "530-0001"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0119"

  metadata = {
    company   = "Greenfield.io LLC"
    plan      = "business"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0120" {
  name        = "Akash Adeyemi"
  email       = "akash.adeyemi@blueshift.tech"
  phone       = "+353516940974"
  description = "BlueShift S.r.l. — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "32 Merrion Square"
    line2       = "Floor 12"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Akash Adeyemi"
    phone = "+353516940974"
    address {
      line1       = "32 Merrion Square"
      line2       = "Floor 12"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0120"

  metadata = {
    company   = "BlueShift S.r.l."
    plan      = "starter"
    sales_rep = "twright"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0121" {
  name        = "Cyrus Dvorak"
  email       = "cyrus.dvorak@vertex.dev"
  phone       = "+886309130756"
  description = "Vertex Technologies — CTO, SaaS company scaling rapidly"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Tower 1"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Cyrus Dvorak"
    phone = "+886309130756"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Tower 1"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0121"

  metadata = {
    company   = "Vertex Technologies"
    plan      = "pro"
    sales_rep = "slee"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0122" {
  name        = "Evelyn Okonkwo"
  email       = "evelyn.okonkwo@blueprintops.tech"
  phone       = "+17865278585"
  description = "BlueprintOps KG — Frontend Lead, design system migration"

  address {
    line1       = "1000 Rue De La Gauchetiere"
    line2       = "Office 101"
    city        = "Montreal"
    state       = "QC"
    postal_code = "H3B 4W5"
    country     = "CA"
  }

  shipping {
    name  = "Evelyn Okonkwo"
    phone = "+17865278585"
    address {
      line1       = "1000 Rue De La Gauchetiere"
      line2       = "Office 101"
      city        = "Montreal"
      state       = "QC"
      postal_code = "H3B 4W5"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0122"

  metadata = {
    company   = "BlueprintOps KG"
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0123" {
  name        = "Dana Cooper"
  email       = "dana.cooper@innospark.co"
  phone       = "+886757584419"
  description = "InnoSpark S.r.l. — Frontend Lead, design system migration"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Office 202"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Dana Cooper"
    phone = "+886757584419"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Office 202"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0123"

  metadata = {
    company   = "InnoSpark S.r.l."
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0124" {
  name        = "Ava Rogers"
  email       = "ava.rogers@zeal.cloud"
  phone       = "+4947338484219"
  description = "Zeal Digital — Product Manager, workflow automation"

  address {
    line1       = "Jungfernstieg 7"
    line2       = "Unit B"
    city        = "Hamburg"
    state       = "Hamburg"
    postal_code = "20095"
    country     = "DE"
  }

  shipping {
    name  = "Ava Rogers"
    phone = "+4947338484219"
    address {
      line1       = "Jungfernstieg 7"
      line2       = "Unit B"
      city        = "Hamburg"
      state       = "Hamburg"
      postal_code = "20095"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0124"

  metadata = {
    company   = "Zeal Digital"
    plan      = "pro"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0125" {
  name        = "Nisha Al-Hassan"
  email       = "nisha.alhassan@quantumleap.io"
  phone       = "+31208267734"
  description = "QuantumLeap ApS — Lead Developer, technical evaluation"

  address {
    line1       = "Coolsingel 40"
    line2       = "Unit B"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Nisha Al-Hassan"
    phone = "+31208267734"
    address {
      line1       = "Coolsingel 40"
      line2       = "Unit B"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0125"

  metadata = {
    company   = "QuantumLeap ApS"
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0126" {
  name        = "Abena Adjei"
  email       = "abena.adjei@vertex.dev"
  phone       = "+436206724004"
  description = "Vertex Software — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Graben 21"
    line2       = "Level 6"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Abena Adjei"
    phone = "+436206724004"
    address {
      line1       = "Graben 21"
      line2       = "Level 6"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0126"

  metadata = {
    company   = "Vertex Software"
    plan      = "business"
    sales_rep = "twright"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0127" {
  name        = "Cyrus Chopra"
  email       = "cyrus.chopra@quill.app"
  phone       = "+4731527420"
  description = "Quill GmbH — Product Manager, workflow automation"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Floor 15"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Cyrus Chopra"
    phone = "+4731527420"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Floor 15"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0127"

  metadata = {
    company   = "Quill GmbH"
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0128" {
  name        = "Niamh Fontaine"
  email       = "niamh.fontaine@tachyonai.io"
  phone       = "+4922753046374"
  description = "TachyonAI Co. — Lead Developer, technical evaluation"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Unit C"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Niamh Fontaine"
    phone = "+4922753046374"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Unit C"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0128"

  metadata = {
    company   = "TachyonAI Co."
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0129" {
  name        = "Evelyn Santos"
  email       = "evelyn.santos@cirrusanalytics.ai"
  phone       = "+6584145933"
  description = "Cirrus Analytics Oy — CTO, SaaS company scaling rapidly"

  address {
    line1       = "1 Raffles Place"
    line2       = "Apt 3B"
    city        = "Singapore"
    postal_code = "048616"
    country     = "SG"
  }

  shipping {
    name  = "Evelyn Santos"
    phone = "+6584145933"
    address {
      line1       = "1 Raffles Place"
      line2       = "Apt 3B"
      city        = "Singapore"
      postal_code = "048616"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0129"

  metadata = {
    company   = "Cirrus Analytics Oy"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0130" {
  name        = "Alessandro Gomes"
  email       = "alessandro.gomes@zephyrcloud.co"
  phone       = "+353918785191"
  description = "ZephyrCloud Ventures — Startup founder, early adopter program"

  address {
    line1       = "32 Merrion Square"
    line2       = "Level 4"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Alessandro Gomes"
    phone = "+353918785191"
    address {
      line1       = "32 Merrion Square"
      line2       = "Level 4"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0130"

  metadata = {
    company   = "ZephyrCloud Ventures"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0131" {
  name        = "Henrique Wilson"
  email       = "henrique.wilson@quantum.io"
  phone       = "+578707286790"
  description = "Quantum B.V. — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Apt 5D"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Henrique Wilson"
    phone = "+578707286790"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Apt 5D"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0131"

  metadata = {
    company   = "Quantum B.V."
    plan      = "business"
    sales_rep = "jchen"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0132" {
  name        = "Pierre Martinez"
  email       = "pierre.martinez@yellowbrick.com"
  phone       = "+351651801704"
  description = "Yellowbrick B.V. — Head of Payments, fintech integration"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Apt 3B"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Pierre Martinez"
    phone = "+351651801704"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Apt 3B"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0132"

  metadata = {
    company   = "Yellowbrick B.V."
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0133" {
  name        = "Ekaterina Alvarez"
  email       = "ekaterina.alvarez@orchid.ai"
  phone       = "+431825128682"
  description = "Orchid Ventures — Product Manager, workflow automation"

  address {
    line1       = "Graben 21"
    line2       = "Building C"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Ekaterina Alvarez"
    phone = "+431825128682"
    address {
      line1       = "Graben 21"
      line2       = "Building C"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0133"

  metadata = {
    company   = "Orchid Ventures"
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0134" {
  name        = "Kojo Lambert"
  email       = "kojo.lambert@wavesync.co"
  phone       = "+358752431069"
  description = "WaveSync S.L. — Backend Engineer, API integration project"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 3"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Kojo Lambert"
    phone = "+358752431069"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 3"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0134"

  metadata = {
    company   = "WaveSync S.L."
    plan      = "pro"
    sales_rep = "akim"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0135" {
  name        = "Hannah Alvarez"
  email       = "hannah.alvarez@foundry.co"
  phone       = "+570673830284"
  description = "Foundry Systems — Co-founder, Series A funded"

  address {
    line1       = "Carrera 7 No. 71-52"
    line2       = "Floor 10"
    city        = "Bogota"
    state       = "Cundinamarca"
    postal_code = "110111"
    country     = "CO"
  }

  shipping {
    name  = "Hannah Alvarez"
    phone = "+570673830284"
    address {
      line1       = "Carrera 7 No. 71-52"
      line2       = "Floor 10"
      city        = "Bogota"
      state       = "Cundinamarca"
      postal_code = "110111"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0135"

  metadata = {
    company   = "Foundry Systems"
    plan      = "business"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0136" {
  name        = "Darius Carter"
  email       = "darius.carter@gammaray.net"
  phone       = "+919268705685"
  description = "GammaRay S.r.l. — VP of Sales, CRM integration"

  address {
    line1       = "Embassy Tech Village"
    line2       = "Apt 4C"
    city        = "Bengaluru"
    state       = "Karnataka"
    postal_code = "560103"
    country     = "IN"
  }

  shipping {
    name  = "Darius Carter"
    phone = "+919268705685"
    address {
      line1       = "Embassy Tech Village"
      line2       = "Apt 4C"
      city        = "Bengaluru"
      state       = "Karnataka"
      postal_code = "560103"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0136"

  metadata = {
    company   = "GammaRay S.r.l."
    plan      = "enterprise"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0137" {
  name        = "Maverick Lebedev"
  email       = "maverick.lebedev@wavesync.app"
  phone       = "+5527086688263"
  description = "WaveSync A/S — Managing Director, long-term partnership"

  address {
    line1       = "Av. Paulista 1578"
    line2       = "Building B"
    city        = "Sao Paulo"
    state       = "SP"
    postal_code = "01310-200"
    country     = "BR"
  }

  shipping {
    name  = "Maverick Lebedev"
    phone = "+5527086688263"
    address {
      line1       = "Av. Paulista 1578"
      line2       = "Building B"
      city        = "Sao Paulo"
      state       = "SP"
      postal_code = "01310-200"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0137"

  metadata = {
    company   = "WaveSync A/S"
    plan      = "business"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0138" {
  name        = "Ewa Brown"
  email       = "ewa.brown@wavesync.com"
  phone       = "+358469901398"
  description = "WaveSync Labs — Operations Director, multi-year deal"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Suite 100"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Ewa Brown"
    phone = "+358469901398"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Suite 100"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0138"

  metadata = {
    company   = "WaveSync Labs"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0139" {
  name        = "Haruto Green"
  email       = "haruto.green@alloy.co"
  phone       = "+33936385467"
  description = "Alloy Labs — Platform Engineer, infrastructure modernization"

  address {
    line1       = "1 Place du Capitole"
    line2       = "Tower 3"
    city        = "Toulouse"
    postal_code = "31000"
    country     = "FR"
  }

  shipping {
    name  = "Haruto Green"
    phone = "+33936385467"
    address {
      line1       = "1 Place du Capitole"
      line2       = "Tower 3"
      city        = "Toulouse"
      postal_code = "31000"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0139"

  metadata = {
    company   = "Alloy Labs"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0140" {
  name        = "Amit Castro"
  email       = "amit.castro@quantumleap.tech"
  phone       = "+56355609320"
  description = "QuantumLeap Partners — Managing Director, long-term partnership"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Office 505"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Amit Castro"
    phone = "+56355609320"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Office 505"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0140"

  metadata = {
    company   = "QuantumLeap Partners"
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0141" {
  name        = "Kavita Wagner"
  email       = "kavita.wagner@blueshift.net"
  phone       = "+5554777252287"
  description = "BlueShift Consulting — VP of Product, expanding to new markets"

  address {
    line1       = "Av. Rio Branco 156"
    line2       = "Suite 100"
    city        = "Rio de Janeiro"
    state       = "RJ"
    postal_code = "20040-020"
    country     = "BR"
  }

  shipping {
    name  = "Kavita Wagner"
    phone = "+5554777252287"
    address {
      line1       = "Av. Rio Branco 156"
      line2       = "Suite 100"
      city        = "Rio de Janeiro"
      state       = "RJ"
      postal_code = "20040-020"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0141"

  metadata = {
    company   = "BlueShift Consulting"
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0142" {
  name        = "Giulia White"
  email       = "giulia.white@kinesis.dev"
  phone       = "+5503875099770"
  description = "Kinesis Solutions — Enterprise client, onboarded Q3 2025"

  address {
    line1       = "Av. Paulista 1578"
    line2       = "Office 101"
    city        = "Sao Paulo"
    state       = "SP"
    postal_code = "01310-200"
    country     = "BR"
  }

  shipping {
    name  = "Giulia White"
    phone = "+5503875099770"
    address {
      line1       = "Av. Paulista 1578"
      line2       = "Office 101"
      city        = "Sao Paulo"
      state       = "SP"
      postal_code = "01310-200"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0142"

  metadata = {
    company   = "Kinesis Solutions"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0143" {
  name        = "Yaw Rogers"
  email       = "yaw.rogers@nordiqflow.dev"
  phone       = "+358118233984"
  description = "NordiqFlow KG — Data Science Lead, analytics use case"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Apt 5D"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Yaw Rogers"
    phone = "+358118233984"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Apt 5D"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0143"

  metadata = {
    company   = "NordiqFlow KG"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0144" {
  name        = "Rina Kang"
  email       = "rina.kang@lunarbyte.io"
  phone       = "+5501666870021"
  description = "LunarByte Digital — Director of IT, compliance focused"

  address {
    line1       = "Av. Rio Branco 156"
    line2       = "Level 4"
    city        = "Rio de Janeiro"
    state       = "RJ"
    postal_code = "20040-020"
    country     = "BR"
  }

  shipping {
    name  = "Rina Kang"
    phone = "+5501666870021"
    address {
      line1       = "Av. Rio Branco 156"
      line2       = "Level 4"
      city        = "Rio de Janeiro"
      state       = "RJ"
      postal_code = "20040-020"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0144"

  metadata = {
    company   = "LunarByte Digital"
    plan      = "business"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0145" {
  name        = "Ava Gomez"
  email       = "ava.gomez@hyperloop.app"
  phone       = "+4701489025"
  description = "HyperLoop Platform — Enterprise client, onboarded Q4 2024"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Suite 500"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Ava Gomez"
    phone = "+4701489025"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Suite 500"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0145"

  metadata = {
    company   = "HyperLoop Platform"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0146" {
  name        = "Rosa King"
  email       = "rosa.king@blueshift.net"
  phone       = "+351562185016"
  description = "BlueShift Pty Ltd — Co-founder, Series A funded"

  address {
    line1       = "Rua de Santa Catarina 112"
    line2       = "Apt 5D"
    city        = "Porto"
    postal_code = "4000-322"
    country     = "PT"
  }

  shipping {
    name  = "Rosa King"
    phone = "+351562185016"
    address {
      line1       = "Rua de Santa Catarina 112"
      line2       = "Apt 5D"
      city        = "Porto"
      postal_code = "4000-322"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0146"

  metadata = {
    company   = "BlueShift Pty Ltd"
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0147" {
  name        = "Sara Mendes"
  email       = "sara.mendes@keystone.cloud"
  phone       = "+64358662961"
  description = "Keystone AB — Backend Engineer, API integration project"

  address {
    line1       = "1 Willis Street"
    line2       = "Floor 2"
    city        = "Wellington"
    state       = "Wellington"
    postal_code = "6011"
    country     = "NZ"
  }

  shipping {
    name  = "Sara Mendes"
    phone = "+64358662961"
    address {
      line1       = "1 Willis Street"
      line2       = "Floor 2"
      city        = "Wellington"
      state       = "Wellington"
      postal_code = "6011"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0147"

  metadata = {
    company   = "Keystone AB"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0148" {
  name        = "Manon Young"
  email       = "manon.young@coresync.ai"
  phone       = "+64551104754"
  description = "CoreSync Digital — Head of Engineering, annual contract"

  address {
    line1       = "23 Customs Street East"
    line2       = "Building B"
    city        = "Auckland"
    state       = "Auckland"
    postal_code = "1010"
    country     = "NZ"
  }

  shipping {
    name  = "Manon Young"
    phone = "+64551104754"
    address {
      line1       = "23 Customs Street East"
      line2       = "Building B"
      city        = "Auckland"
      state       = "Auckland"
      postal_code = "1010"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0148"

  metadata = {
    company   = "CoreSync Digital"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0149" {
  name        = "Dana Choi"
  email       = "dana.choi@tachyonai.io"
  phone       = "+33581995604"
  description = "TachyonAI ApS — Head of Payments, fintech integration"

  address {
    line1       = "12 Avenue des Champs-Elysees"
    line2       = "Unit C"
    city        = "Paris"
    postal_code = "75008"
    country     = "FR"
  }

  shipping {
    name  = "Dana Choi"
    phone = "+33581995604"
    address {
      line1       = "12 Avenue des Champs-Elysees"
      line2       = "Unit C"
      city        = "Paris"
      postal_code = "75008"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0149"

  metadata = {
    company   = "TachyonAI ApS"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0150" {
  name        = "Axel Yang"
  email       = "axel.yang@brightpath.dev"
  phone       = "+824447212646"
  description = "BrightPath Systems — Staff Engineer, enterprise consultant"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Unit C"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Axel Yang"
    phone = "+824447212646"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Unit C"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0150"

  metadata = {
    company   = "BrightPath Systems"
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0151" {
  name        = "Shruti Eriksson"
  email       = "shruti.eriksson@horizon.dev"
  phone       = "+394065965756"
  description = "Horizon B.V. — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Via Monte Napoleone 8"
    line2       = "Floor 20"
    city        = "Milano"
    state       = "MI"
    postal_code = "20121"
    country     = "IT"
  }

  shipping {
    name  = "Shruti Eriksson"
    phone = "+394065965756"
    address {
      line1       = "Via Monte Napoleone 8"
      line2       = "Floor 20"
      city        = "Milano"
      state       = "MI"
      postal_code = "20121"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0151"

  metadata = {
    company   = "Horizon B.V."
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0152" {
  name        = "Yang Yamamoto"
  email       = "yang.yamamoto@cloudnova.cloud"
  phone       = "+31935646519"
  description = "CloudNova S.L. — Operations Director, multi-year deal"

  address {
    line1       = "Coolsingel 40"
    line2       = "Unit A"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Yang Yamamoto"
    phone = "+31935646519"
    address {
      line1       = "Coolsingel 40"
      line2       = "Unit A"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0152"

  metadata = {
    company   = "CloudNova S.L."
    plan      = "starter"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0153" {
  name        = "Thiago Morgan"
  email       = "thiago.morgan@jubilee.cloud"
  phone       = "+4924342661797"
  description = "Jubilee Digital — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Apt 3B"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Thiago Morgan"
    phone = "+4924342661797"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Apt 3B"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0153"

  metadata = {
    company   = "Jubilee Digital"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0154" {
  name        = "Yaw Eriksson"
  email       = "yaw.eriksson@keystone.co"
  phone       = "+4952909656101"
  description = "Keystone Ventures — Managing Director, long-term partnership"

  address {
    line1       = "Friedrichstraße 68"
    line2       = "Apt 5D"
    city        = "Berlin"
    state       = "Berlin"
    postal_code = "10117"
    country     = "DE"
  }

  shipping {
    name  = "Yaw Eriksson"
    phone = "+4952909656101"
    address {
      line1       = "Friedrichstraße 68"
      line2       = "Apt 5D"
      city        = "Berlin"
      state       = "Berlin"
      postal_code = "10117"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0154"

  metadata = {
    company   = "Keystone Ventures"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0155" {
  name        = "Mei Fedorov"
  email       = "mei.fedorov@pinnacle.tech"
  phone       = "+570714611254"
  description = "Pinnacle Sp. z o.o. — Lead Developer, technical evaluation"

  address {
    line1       = "Carrera 7 No. 71-52"
    line2       = "Apt 2A"
    city        = "Bogota"
    state       = "Cundinamarca"
    postal_code = "110111"
    country     = "CO"
  }

  shipping {
    name  = "Mei Fedorov"
    phone = "+570714611254"
    address {
      line1       = "Carrera 7 No. 71-52"
      line2       = "Apt 2A"
      city        = "Bogota"
      state       = "Cundinamarca"
      postal_code = "110111"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0155"

  metadata = {
    company   = "Pinnacle Sp. z o.o."
    plan      = "pro"
    sales_rep = "twright"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0156" {
  name        = "Wang Jones"
  email       = "wang.jones@kryptonsoft.tech"
  phone       = "+571401051238"
  description = "KryptonSoft Labs — VP of Product, expanding to new markets"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Building C"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Wang Jones"
    phone = "+571401051238"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Building C"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0156"

  metadata = {
    company   = "KryptonSoft Labs"
    plan      = "business"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0157" {
  name        = "Rohan Roux"
  email       = "rohan.roux@jetpack.ai"
  phone       = "+61609379660"
  description = "Jetpack S.A. — VP of Sales, CRM integration"

  address {
    line1       = "100 Eagle Street"
    line2       = "Level 11"
    city        = "Brisbane"
    state       = "QLD"
    postal_code = "4000"
    country     = "AU"
  }

  shipping {
    name  = "Rohan Roux"
    phone = "+61609379660"
    address {
      line1       = "100 Eagle Street"
      line2       = "Level 11"
      city        = "Brisbane"
      state       = "QLD"
      postal_code = "4000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0157"

  metadata = {
    company   = "Jetpack S.A."
    plan      = "pro"
    sales_rep = "akim"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0158" {
  name        = "Jaxon Zhou"
  email       = "jaxon.zhou@datapulse.cloud"
  phone       = "+31147859696"
  description = "DataPulse AG — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Dam 1"
    line2       = "Floor 15"
    city        = "Amsterdam"
    state       = "North Holland"
    postal_code = "1012 JS"
    country     = "NL"
  }

  shipping {
    name  = "Jaxon Zhou"
    phone = "+31147859696"
    address {
      line1       = "Dam 1"
      line2       = "Floor 15"
      city        = "Amsterdam"
      state       = "North Holland"
      postal_code = "1012 JS"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0158"

  metadata = {
    company   = "DataPulse AG"
    plan      = "business"
    sales_rep = "twright"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0159" {
  name        = "Diego Svensson"
  email       = "diego.svensson@elevate.tech"
  phone       = "+521341252866"
  description = "Elevate Ltd. — Security Lead, zero-trust implementation"

  address {
    line1       = "Paseo de la Reforma 250"
    line2       = "Tower 2"
    city        = "Mexico City"
    state       = "CDMX"
    postal_code = "06600"
    country     = "MX"
  }

  shipping {
    name  = "Diego Svensson"
    phone = "+521341252866"
    address {
      line1       = "Paseo de la Reforma 250"
      line2       = "Tower 2"
      city        = "Mexico City"
      state       = "CDMX"
      postal_code = "06600"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0159"

  metadata = {
    company   = "Elevate Ltd."
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0160" {
  name        = "Akua Ribeiro"
  email       = "akua.ribeiro@unison.net"
  phone       = "+432742257905"
  description = "Unison Solutions — Enterprise client, onboarded Q4 2025"

  address {
    line1       = "Graben 21"
    line2       = "Level 9"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Akua Ribeiro"
    phone = "+432742257905"
    address {
      line1       = "Graben 21"
      line2       = "Level 9"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0160"

  metadata = {
    company   = "Unison Solutions"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0161" {
  name        = "Suresh Pokorny"
  email       = "suresh.pokorny@radiantio.ai"
  phone       = "+527721903404"
  description = "RadiantIO ApS — Co-founder, Series A funded"

  address {
    line1       = "Av. Vallarta 2440"
    line2       = "Tower 2"
    city        = "Guadalajara"
    state       = "Jalisco"
    postal_code = "44100"
    country     = "MX"
  }

  shipping {
    name  = "Suresh Pokorny"
    phone = "+527721903404"
    address {
      line1       = "Av. Vallarta 2440"
      line2       = "Tower 2"
      city        = "Guadalajara"
      state       = "Jalisco"
      postal_code = "44100"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0161"

  metadata = {
    company   = "RadiantIO ApS"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0162" {
  name        = "Layla Wang"
  email       = "layla.wang@wavecrestlabs.net"
  phone       = "+33580783613"
  description = "Wavecrest Labs Sp. z o.o. — Staff Engineer, enterprise consultant"

  address {
    line1       = "8 La Canebiere"
    line2       = "Floor 2"
    city        = "Marseille"
    postal_code = "13001"
    country     = "FR"
  }

  shipping {
    name  = "Layla Wang"
    phone = "+33580783613"
    address {
      line1       = "8 La Canebiere"
      line2       = "Floor 2"
      city        = "Marseille"
      postal_code = "13001"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0162"

  metadata = {
    company   = "Wavecrest Labs Sp. z o.o."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0163" {
  name        = "Thiago Moore"
  email       = "thiago.moore@cipher.org"
  phone       = "+5559629233095"
  description = "Cipher Partners — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Av. Paulista 1578"
    line2       = "Office 202"
    city        = "Sao Paulo"
    state       = "SP"
    postal_code = "01310-200"
    country     = "BR"
  }

  shipping {
    name  = "Thiago Moore"
    phone = "+5559629233095"
    address {
      line1       = "Av. Paulista 1578"
      line2       = "Office 202"
      city        = "Sao Paulo"
      state       = "SP"
      postal_code = "01310-200"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0163"

  metadata = {
    company   = "Cipher Partners"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0164" {
  name        = "Maja Stewart"
  email       = "maja.stewart@yonder.dev"
  phone       = "+4560422325"
  description = "Yonder Software — Co-founder, Series A funded"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Office 101"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Maja Stewart"
    phone = "+4560422325"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Office 101"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0164"

  metadata = {
    company   = "Yonder Software"
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0165" {
  name        = "Alessandro Schulz"
  email       = "alessandro.schulz@lambdacore.ai"
  phone       = "+972845775901"
  description = "LambdaCore Ltd. — Product Manager, workflow automation"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Apt 5D"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Alessandro Schulz"
    phone = "+972845775901"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Apt 5D"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0165"

  metadata = {
    company   = "LambdaCore Ltd."
    plan      = "business"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0166" {
  name        = "Ananya Fontaine"
  email       = "ananya.fontaine@indie.tech"
  phone       = "+353458929750"
  description = "Indie B.V. — Startup founder, early adopter program"

  address {
    line1       = "70 South Mall"
    line2       = "Floor 12"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Ananya Fontaine"
    phone = "+353458929750"
    address {
      line1       = "70 South Mall"
      line2       = "Floor 12"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0166"

  metadata = {
    company   = "Indie B.V."
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0167" {
  name        = "Camila Jimenez"
  email       = "camila.jimenez@heliosphere.dev"
  phone       = "+14241541520"
  description = "Heliosphere ApS — CEO, climate tech innovator"

  address {
    line1       = "1000 Rue De La Gauchetiere"
    line2       = "Floor 3"
    city        = "Montreal"
    state       = "QC"
    postal_code = "H3B 4W5"
    country     = "CA"
  }

  shipping {
    name  = "Camila Jimenez"
    phone = "+14241541520"
    address {
      line1       = "1000 Rue De La Gauchetiere"
      line2       = "Floor 3"
      city        = "Montreal"
      state       = "QC"
      postal_code = "H3B 4W5"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0167"

  metadata = {
    company   = "Heliosphere ApS"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0168" {
  name        = "Olivia Campbell"
  email       = "olivia.campbell@pulsenet.net"
  phone       = "+817005162713"
  description = "PulseNet Ltd. — CEO, climate tech innovator"

  address {
    line1       = "2-21-1 Shibuya"
    line2       = "Apt 3B"
    city        = "Shibuya-ku"
    state       = "Tokyo"
    postal_code = "150-0002"
    country     = "JP"
  }

  shipping {
    name  = "Olivia Campbell"
    phone = "+817005162713"
    address {
      line1       = "2-21-1 Shibuya"
      line2       = "Apt 3B"
      city        = "Shibuya-ku"
      state       = "Tokyo"
      postal_code = "150-0002"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0168"

  metadata = {
    company   = "PulseNet Ltd."
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0169" {
  name        = "Rosa White"
  email       = "rosa.white@coresync.dev"
  phone       = "+358189092753"
  description = "CoreSync Group — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Unit A"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Rosa White"
    phone = "+358189092753"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Unit A"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0169"

  metadata = {
    company   = "CoreSync Group"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0170" {
  name        = "Ryan Garcia"
  email       = "ryan.garcia@blueprintops.tech"
  phone       = "+33652341389"
  description = "BlueprintOps Group — Security Lead, zero-trust implementation"

  address {
    line1       = "1 Place du Capitole"
    line2       = "Unit A"
    city        = "Toulouse"
    postal_code = "31000"
    country     = "FR"
  }

  shipping {
    name  = "Ryan Garcia"
    phone = "+33652341389"
    address {
      line1       = "1 Place du Capitole"
      line2       = "Unit A"
      city        = "Toulouse"
      postal_code = "31000"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0170"

  metadata = {
    company   = "BlueprintOps Group"
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0171" {
  name        = "Parisa Gustafsson"
  email       = "parisa.gustafsson@tachyonai.app"
  phone       = "+56037613791"
  description = "TachyonAI B.V. — Growth Lead, high-velocity team"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Apt 4C"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Parisa Gustafsson"
    phone = "+56037613791"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Apt 4C"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0171"

  metadata = {
    company   = "TachyonAI B.V."
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0172" {
  name        = "Elsa Dupont"
  email       = "elsa.dupont@alphawave.cloud"
  phone       = "+521091043006"
  description = "AlphaWave SAS — Growth Lead, high-velocity team"

  address {
    line1       = "Paseo de la Reforma 250"
    line2       = "Floor 2"
    city        = "Mexico City"
    state       = "CDMX"
    postal_code = "06600"
    country     = "MX"
  }

  shipping {
    name  = "Elsa Dupont"
    phone = "+521091043006"
    address {
      line1       = "Paseo de la Reforma 250"
      line2       = "Floor 2"
      city        = "Mexico City"
      state       = "CDMX"
      postal_code = "06600"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0172"

  metadata = {
    company   = "AlphaWave SAS"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0173" {
  name        = "Yaw Zhou"
  email       = "yaw.zhou@horizon.app"
  phone       = "+911832856914"
  description = "Horizon GmbH — VP of Sales, CRM integration"

  address {
    line1       = "Embassy Tech Village"
    line2       = "Floor 2"
    city        = "Bengaluru"
    state       = "Karnataka"
    postal_code = "560103"
    country     = "IN"
  }

  shipping {
    name  = "Yaw Zhou"
    phone = "+911832856914"
    address {
      line1       = "Embassy Tech Village"
      line2       = "Floor 2"
      city        = "Bengaluru"
      state       = "Karnataka"
      postal_code = "560103"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0173"

  metadata = {
    company   = "Horizon GmbH"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0174" {
  name        = "Pedro Wilson"
  email       = "pedro.wilson@mesontech.app"
  phone       = "+971210202758"
  description = "MesonTech Technologies — Growth Lead, high-velocity team"

  address {
    line1       = "Dubai Internet City, Building 1"
    line2       = "Office 101"
    city        = "Dubai"
    postal_code = "500001"
    country     = "AE"
  }

  shipping {
    name  = "Pedro Wilson"
    phone = "+971210202758"
    address {
      line1       = "Dubai Internet City, Building 1"
      line2       = "Office 101"
      city        = "Dubai"
      postal_code = "500001"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0174"

  metadata = {
    company   = "MesonTech Technologies"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0175" {
  name        = "Caleb Fedorov"
  email       = "caleb.fedorov@sable.app"
  phone       = "+31814917785"
  description = "Sable Inc. — Startup founder, early adopter program"

  address {
    line1       = "Coolsingel 40"
    line2       = "Unit D"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Caleb Fedorov"
    phone = "+31814917785"
    address {
      line1       = "Coolsingel 40"
      line2       = "Unit D"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0175"

  metadata = {
    company   = "Sable Inc."
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0176" {
  name        = "Jaxon Jang"
  email       = "jaxon.jang@pinnacle.net"
  phone       = "+33000307562"
  description = "Pinnacle Labs — VP of Product, expanding to new markets"

  address {
    line1       = "45 Rue de la Republique"
    line2       = "Unit C"
    city        = "Lyon"
    postal_code = "69002"
    country     = "FR"
  }

  shipping {
    name  = "Jaxon Jang"
    phone = "+33000307562"
    address {
      line1       = "45 Rue de la Republique"
      line2       = "Unit C"
      city        = "Lyon"
      postal_code = "69002"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0176"

  metadata = {
    company   = "Pinnacle Labs"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0177" {
  name        = "Francesca Asante"
  email       = "francesca.asante@ultranode.org"
  phone       = "+358518023806"
  description = "UltraNode AB — Product lead, migrated from competitor"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 2"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Francesca Asante"
    phone = "+358518023806"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 2"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0177"

  metadata = {
    company   = "UltraNode AB"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0178" {
  name        = "Hala Jimenez"
  email       = "hala.jimenez@vortexlabs.org"
  phone       = "+14937597383"
  description = "Vortex Labs AG — CTO, SaaS company scaling rapidly"

  address {
    line1       = "200 Burrard Street"
    line2       = "Level 6"
    city        = "Vancouver"
    state       = "BC"
    postal_code = "V6C 2T6"
    country     = "CA"
  }

  shipping {
    name  = "Hala Jimenez"
    phone = "+14937597383"
    address {
      line1       = "200 Burrard Street"
      line2       = "Level 6"
      city        = "Vancouver"
      state       = "BC"
      postal_code = "V6C 2T6"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0178"

  metadata = {
    company   = "Vortex Labs AG"
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0179" {
  name        = "Elsa Horak"
  email       = "elsa.horak@kinesis.tech"
  phone       = "+41064138367"
  description = "Kinesis Digital — Startup founder, early adopter program"

  address {
    line1       = "Bahnhofstrasse 10"
    line2       = "Unit B"
    city        = "Zurich"
    state       = "ZH"
    postal_code = "8001"
    country     = "CH"
  }

  shipping {
    name  = "Elsa Horak"
    phone = "+41064138367"
    address {
      line1       = "Bahnhofstrasse 10"
      line2       = "Unit B"
      city        = "Zurich"
      state       = "ZH"
      postal_code = "8001"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0179"

  metadata = {
    company   = "Kinesis Digital"
    plan      = "business"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0180" {
  name        = "Darius Girard"
  email       = "darius.girard@summit.io"
  phone       = "+46918261990"
  description = "Summit Platform — Head of Payments, fintech integration"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Office 404"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Darius Girard"
    phone = "+46918261990"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Office 404"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0180"

  metadata = {
    company   = "Summit Platform"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0181" {
  name        = "Sienna Gomes"
  email       = "sienna.gomes@jubilee.cloud"
  phone       = "+31431329121"
  description = "Jubilee Labs — VP of Product, expanding to new markets"

  address {
    line1       = "Coolsingel 40"
    line2       = "Floor 5"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Sienna Gomes"
    phone = "+31431329121"
    address {
      line1       = "Coolsingel 40"
      line2       = "Floor 5"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0181"

  metadata = {
    company   = "Jubilee Labs"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0182" {
  name        = "Yaw Schmidt"
  email       = "yaw.schmidt@alloy.app"
  phone       = "+17411249035"
  description = "Alloy Group — CTO, SaaS company scaling rapidly"

  address {
    line1       = "200 Burrard Street"
    line2       = "Tower 3"
    city        = "Vancouver"
    state       = "BC"
    postal_code = "V6C 2T6"
    country     = "CA"
  }

  shipping {
    name  = "Yaw Schmidt"
    phone = "+17411249035"
    address {
      line1       = "200 Burrard Street"
      line2       = "Tower 3"
      city        = "Vancouver"
      state       = "BC"
      postal_code = "V6C 2T6"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0182"

  metadata = {
    company   = "Alloy Group"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0183" {
  name        = "Charlotte Souza"
  email       = "charlotte.souza@synapseio.com"
  phone       = "+358678831712"
  description = "SynapseIO AB — Head of Engineering, annual contract"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 20"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Charlotte Souza"
    phone = "+358678831712"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 20"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0183"

  metadata = {
    company   = "SynapseIO AB"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0184" {
  name        = "Fiona Hoffmann"
  email       = "fiona.hoffmann@quantum.org"
  phone       = "+972941013721"
  description = "Quantum Solutions — Lead Developer, technical evaluation"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Floor 12"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Fiona Hoffmann"
    phone = "+972941013721"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Floor 12"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0184"

  metadata = {
    company   = "Quantum Solutions"
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0185" {
  name        = "Maja Fernandez"
  email       = "maja.fernandez@indie.com"
  phone       = "+826625324472"
  description = "Indie Labs — Startup founder, early adopter program"

  address {
    line1       = "55 Jungang-daero, Jung-gu"
    line2       = "Level 9"
    city        = "Busan"
    state       = "Busan"
    postal_code = "48058"
    country     = "KR"
  }

  shipping {
    name  = "Maja Fernandez"
    phone = "+826625324472"
    address {
      line1       = "55 Jungang-daero, Jung-gu"
      line2       = "Level 9"
      city        = "Busan"
      state       = "Busan"
      postal_code = "48058"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0185"

  metadata = {
    company   = "Indie Labs"
    plan      = "business"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0186" {
  name        = "Yang Liu"
  email       = "yang.liu@terraflux.ai"
  phone       = "+823838065787"
  description = "TerraFlux AB — Data Science Lead, analytics use case"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Suite 200"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Yang Liu"
    phone = "+823838065787"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Suite 200"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0186"

  metadata = {
    company   = "TerraFlux AB"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0187" {
  name        = "Leila Eriksson"
  email       = "leila.eriksson@innospark.com"
  phone       = "+41785932133"
  description = "InnoSpark Inc. — Managing Director, long-term partnership"

  address {
    line1       = "Rue du Rhone 50"
    line2       = "Apt 2A"
    city        = "Geneva"
    state       = "GE"
    postal_code = "1201"
    country     = "CH"
  }

  shipping {
    name  = "Leila Eriksson"
    phone = "+41785932133"
    address {
      line1       = "Rue du Rhone 50"
      line2       = "Apt 2A"
      city        = "Geneva"
      state       = "GE"
      postal_code = "1201"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0187"

  metadata = {
    company   = "InnoSpark Inc."
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0188" {
  name        = "Thomas Nguyen"
  email       = "thomas.nguyen@kineticai.org"
  phone       = "+31059929378"
  description = "KineticAI Sp. z o.o. — Staff Engineer, enterprise consultant"

  address {
    line1       = "Coolsingel 40"
    line2       = "Suite 400"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Thomas Nguyen"
    phone = "+31059929378"
    address {
      line1       = "Coolsingel 40"
      line2       = "Suite 400"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0188"

  metadata = {
    company   = "KineticAI Sp. z o.o."
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0189" {
  name        = "Nisha Nilsson"
  email       = "nisha.nilsson@innospark.com"
  phone       = "+4559325250"
  description = "InnoSpark Inc. — Enterprise client, onboarded Q3 2024"

  address {
    line1       = "Store Torv 4"
    line2       = "Apt 3B"
    city        = "Aarhus"
    postal_code = "8000"
    country     = "DK"
  }

  shipping {
    name  = "Nisha Nilsson"
    phone = "+4559325250"
    address {
      line1       = "Store Torv 4"
      line2       = "Apt 3B"
      city        = "Aarhus"
      postal_code = "8000"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0189"

  metadata = {
    company   = "InnoSpark Inc."
    plan      = "pro"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0190" {
  name        = "Ella Hoffmann"
  email       = "ella.hoffmann@traverse.tech"
  phone       = "+824522675289"
  description = "Traverse Systems — Data Science Lead, analytics use case"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Office 202"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Ella Hoffmann"
    phone = "+824522675289"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Office 202"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0190"

  metadata = {
    company   = "Traverse Systems"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0191" {
  name        = "Addison Nguyen"
  email       = "addison.nguyen@wavelength.org"
  phone       = "+570295939172"
  description = "Wavelength Inc. — Lead Developer, technical evaluation"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Floor 12"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Addison Nguyen"
    phone = "+570295939172"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Floor 12"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0191"

  metadata = {
    company   = "Wavelength Inc."
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0192" {
  name        = "Chloe Adeyemi"
  email       = "chloe.adeyemi@outlook.cloud"
  phone       = "+56043315410"
  description = "Outlook Solutions — Startup founder, early adopter program"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Floor 12"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Chloe Adeyemi"
    phone = "+56043315410"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Floor 12"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0192"

  metadata = {
    company   = "Outlook Solutions"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0193" {
  name        = "Giulia Chopra"
  email       = "giulia.chopra@plume.io"
  phone       = "+46793271040"
  description = "Plume S.L. — Lead Developer, technical evaluation"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Floor 12"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Giulia Chopra"
    phone = "+46793271040"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Floor 12"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0193"

  metadata = {
    company   = "Plume S.L."
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0194" {
  name        = "Dmitri King"
  email       = "dmitri.king@wavelength.tech"
  phone       = "+48997062962"
  description = "Wavelength Ltd. — Startup founder, early adopter program"

  address {
    line1       = "ul. Marszalkowska 27"
    line2       = "Apt 6E"
    city        = "Warsaw"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Dmitri King"
    phone = "+48997062962"
    address {
      line1       = "ul. Marszalkowska 27"
      line2       = "Apt 6E"
      city        = "Warsaw"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0194"

  metadata = {
    company   = "Wavelength Ltd."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0195" {
  name        = "Hala Asante"
  email       = "hala.asante@vivid.app"
  phone       = "+48431069872"
  description = "Vivid Labs — Startup founder, early adopter program"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Office 202"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Hala Asante"
    phone = "+48431069872"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Office 202"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0195"

  metadata = {
    company   = "Vivid Labs"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0196" {
  name        = "Yang Baker"
  email       = "yang.baker@quantumleap.app"
  phone       = "+11714677418"
  description = "QuantumLeap Inc. — CEO, climate tech innovator"

  address {
    line1       = "100 King Street West"
    line2       = "Floor 15"
    city        = "Toronto"
    state       = "ON"
    postal_code = "M5H 2N2"
    country     = "CA"
  }

  shipping {
    name  = "Yang Baker"
    phone = "+11714677418"
    address {
      line1       = "100 King Street West"
      line2       = "Floor 15"
      city        = "Toronto"
      state       = "ON"
      postal_code = "M5H 2N2"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0196"

  metadata = {
    company   = "QuantumLeap Inc."
    plan      = "business"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0197" {
  name        = "Felipe Rossi"
  email       = "felipe.rossi@nexgen.co"
  phone       = "+394902115869"
  description = "NexGen Oy — Co-founder, Series A funded"

  address {
    line1       = "Via del Corso 300"
    line2       = "Level 6"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Felipe Rossi"
    phone = "+394902115869"
    address {
      line1       = "Via del Corso 300"
      line2       = "Level 6"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0197"

  metadata = {
    company   = "NexGen Oy"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0198" {
  name        = "Wang Jang"
  email       = "wang.jang@plume.io"
  phone       = "+353608989921"
  description = "Plume Pty Ltd — Backend Engineer, API integration project"

  address {
    line1       = "70 South Mall"
    line2       = "Floor 20"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Wang Jang"
    phone = "+353608989921"
    address {
      line1       = "70 South Mall"
      line2       = "Floor 20"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0198"

  metadata = {
    company   = "Plume Pty Ltd"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0199" {
  name        = "Asher Weber"
  email       = "asher.weber@ionpath.co"
  phone       = "+522945116868"
  description = "IonPath Ltd. — Lead Developer, technical evaluation"

  address {
    line1       = "Av. Vallarta 2440"
    line2       = "Level 14"
    city        = "Guadalajara"
    state       = "Jalisco"
    postal_code = "44100"
    country     = "MX"
  }

  shipping {
    name  = "Asher Weber"
    phone = "+522945116868"
    address {
      line1       = "Av. Vallarta 2440"
      line2       = "Level 14"
      city        = "Guadalajara"
      state       = "Jalisco"
      postal_code = "44100"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0199"

  metadata = {
    company   = "IonPath Ltd."
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0200" {
  name        = "Shirin Dupont"
  email       = "shirin.dupont@wavecrestlabs.org"
  phone       = "+819911914856"
  description = "Wavecrest Labs ApS — Managing Director, long-term partnership"

  address {
    line1       = "2-21-1 Shibuya"
    line2       = "Tower 1"
    city        = "Shibuya-ku"
    state       = "Tokyo"
    postal_code = "150-0002"
    country     = "JP"
  }

  shipping {
    name  = "Shirin Dupont"
    phone = "+819911914856"
    address {
      line1       = "2-21-1 Shibuya"
      line2       = "Tower 1"
      city        = "Shibuya-ku"
      state       = "Tokyo"
      postal_code = "150-0002"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0200"

  metadata = {
    company   = "Wavecrest Labs ApS"
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0201" {
  name        = "Mei-Ling Torres"
  email       = "meiling.torres@prismtech.com"
  phone       = "+816530745054"
  description = "PrismTech S.L. — Staff Engineer, enterprise consultant"

  address {
    line1       = "4-7-1 Meieki, Nakamura-ku"
    line2       = "Unit B"
    city        = "Nagoya"
    state       = "Aichi"
    postal_code = "460-0008"
    country     = "JP"
  }

  shipping {
    name  = "Mei-Ling Torres"
    phone = "+816530745054"
    address {
      line1       = "4-7-1 Meieki, Nakamura-ku"
      line2       = "Unit B"
      city        = "Nagoya"
      state       = "Aichi"
      postal_code = "460-0008"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0201"

  metadata = {
    company   = "PrismTech S.L."
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0202" {
  name        = "Julian Cooper"
  email       = "julian.cooper@beacon.app"
  phone       = "+396913736785"
  description = "Beacon Labs — Startup founder, early adopter program"

  address {
    line1       = "Via del Corso 300"
    line2       = "Apt 5D"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Julian Cooper"
    phone = "+396913736785"
    address {
      line1       = "Via del Corso 300"
      line2       = "Apt 5D"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0202"

  metadata = {
    company   = "Beacon Labs"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0203" {
  name        = "Ellie Orlov"
  email       = "ellie.orlov@luminary.dev"
  phone       = "+41330307053"
  description = "Luminary KG — Managing Director, long-term partnership"

  address {
    line1       = "Bahnhofstrasse 10"
    line2       = "Floor 5"
    city        = "Zurich"
    state       = "ZH"
    postal_code = "8001"
    country     = "CH"
  }

  shipping {
    name  = "Ellie Orlov"
    phone = "+41330307053"
    address {
      line1       = "Bahnhofstrasse 10"
      line2       = "Floor 5"
      city        = "Zurich"
      state       = "ZH"
      postal_code = "8001"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0203"

  metadata = {
    company   = "Luminary KG"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0204" {
  name        = "Grace Turner"
  email       = "grace.turner@betaforge.dev"
  phone       = "+971798552414"
  description = "BetaForge A/S — Enterprise client, onboarded Q3 2025"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Unit A"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Grace Turner"
    phone = "+971798552414"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Unit A"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0204"

  metadata = {
    company   = "BetaForge A/S"
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0205" {
  name        = "Deepika Cerny"
  email       = "deepika.cerny@innospark.ai"
  phone       = "+18007229034"
  description = "InnoSpark Systems — Security Lead, zero-trust implementation"

  address {
    line1       = "200 Burrard Street"
    line2       = "Apt 2A"
    city        = "Vancouver"
    state       = "BC"
    postal_code = "V6C 2T6"
    country     = "CA"
  }

  shipping {
    name  = "Deepika Cerny"
    phone = "+18007229034"
    address {
      line1       = "200 Burrard Street"
      line2       = "Apt 2A"
      city        = "Vancouver"
      state       = "BC"
      postal_code = "V6C 2T6"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0205"

  metadata = {
    company   = "InnoSpark Systems"
    plan      = "business"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0206" {
  name        = "Rina Cruz"
  email       = "rina.cruz@hyperloop.net"
  phone       = "+6596910858"
  description = "HyperLoop Oy — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "1 Fusionopolis Walk"
    line2       = "Tower 1"
    city        = "Singapore"
    postal_code = "138589"
    country     = "SG"
  }

  shipping {
    name  = "Rina Cruz"
    phone = "+6596910858"
    address {
      line1       = "1 Fusionopolis Walk"
      line2       = "Tower 1"
      city        = "Singapore"
      postal_code = "138589"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0206"

  metadata = {
    company   = "HyperLoop Oy"
    plan      = "business"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0207" {
  name        = "Jackson Matsumoto"
  email       = "jackson.matsumoto@prismtech.app"
  phone       = "+31432830965"
  description = "PrismTech Solutions — Frontend Lead, design system migration"

  address {
    line1       = "Coolsingel 40"
    line2       = "Office 202"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Jackson Matsumoto"
    phone = "+31432830965"
    address {
      line1       = "Coolsingel 40"
      line2       = "Office 202"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0207"

  metadata = {
    company   = "PrismTech Solutions"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0208" {
  name        = "Jean Dupont"
  email       = "jean.dupont@fusiongrid.org"
  phone       = "+56935387584"
  description = "FusionGrid S.L. — VP of Product, expanding to new markets"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Floor 8"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Jean Dupont"
    phone = "+56935387584"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Floor 8"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0208"

  metadata = {
    company   = "FusionGrid S.L."
    plan      = "business"
    sales_rep = "twright"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0209" {
  name        = "Jean Boateng"
  email       = "jean.boateng@gradient.tech"
  phone       = "+886135346554"
  description = "Gradient SAS — Chief Revenue Officer, revenue operations"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Suite 400"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Jean Boateng"
    phone = "+886135346554"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Suite 400"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0209"

  metadata = {
    company   = "Gradient SAS"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0210" {
  name        = "Albin Han"
  email       = "albin.han@xenon.co"
  phone       = "+4981684602235"
  description = "Xenon Technologies — Head of Payments, fintech integration"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Floor 2"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Albin Han"
    phone = "+4981684602235"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Floor 2"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0210"

  metadata = {
    company   = "Xenon Technologies"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0211" {
  name        = "Lin Saito"
  email       = "lin.saito@jetpack.com"
  phone       = "+31743292712"
  description = "Jetpack S.A. — Security Lead, zero-trust implementation"

  address {
    line1       = "Dam 1"
    line2       = "Tower 1"
    city        = "Amsterdam"
    state       = "North Holland"
    postal_code = "1012 JS"
    country     = "NL"
  }

  shipping {
    name  = "Lin Saito"
    phone = "+31743292712"
    address {
      line1       = "Dam 1"
      line2       = "Tower 1"
      city        = "Amsterdam"
      state       = "North Holland"
      postal_code = "1012 JS"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0211"

  metadata = {
    company   = "Jetpack S.A."
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0212" {
  name        = "Nikolai Nakamura"
  email       = "nikolai.nakamura@luminarestudio.tech"
  phone       = "+10583003354"
  description = "Luminare Studio SAS — CTO, SaaS company scaling rapidly"

  address {
    line1       = "1000 Rue De La Gauchetiere"
    line2       = "Office 303"
    city        = "Montreal"
    state       = "QC"
    postal_code = "H3B 4W5"
    country     = "CA"
  }

  shipping {
    name  = "Nikolai Nakamura"
    phone = "+10583003354"
    address {
      line1       = "1000 Rue De La Gauchetiere"
      line2       = "Office 303"
      city        = "Montreal"
      state       = "QC"
      postal_code = "H3B 4W5"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0212"

  metadata = {
    company   = "Luminare Studio SAS"
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0213" {
  name        = "Savannah Costa"
  email       = "savannah.costa@indie.cloud"
  phone       = "+6589856257"
  description = "Indie LLC — Data Science Lead, analytics use case"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Unit B"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Savannah Costa"
    phone = "+6589856257"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Unit B"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0213"

  metadata = {
    company   = "Indie LLC"
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0214" {
  name        = "Arjun Osei"
  email       = "arjun.osei@solarwindhq.org"
  phone       = "+56821506489"
  description = "SolarWind HQ B.V. — Startup founder, early adopter program"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Suite 400"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Arjun Osei"
    phone = "+56821506489"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Suite 400"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0214"

  metadata = {
    company   = "SolarWind HQ B.V."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0215" {
  name        = "Eleanor Bonnet"
  email       = "eleanor.bonnet@kryptonsoft.cloud"
  phone       = "+33230461849"
  description = "KryptonSoft S.L. — Security Lead, zero-trust implementation"

  address {
    line1       = "8 La Canebiere"
    line2       = "Floor 5"
    city        = "Marseille"
    postal_code = "13001"
    country     = "FR"
  }

  shipping {
    name  = "Eleanor Bonnet"
    phone = "+33230461849"
    address {
      line1       = "8 La Canebiere"
      line2       = "Floor 5"
      city        = "Marseille"
      postal_code = "13001"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0215"

  metadata = {
    company   = "KryptonSoft S.L."
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0216" {
  name        = "Fritz Wilson"
  email       = "fritz.wilson@drift.org"
  phone       = "+353348356420"
  description = "Drift Corp. — Platform Engineer, infrastructure modernization"

  address {
    line1       = "32 Merrion Square"
    line2       = "Office 505"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Fritz Wilson"
    phone = "+353348356420"
    address {
      line1       = "32 Merrion Square"
      line2       = "Office 505"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0216"

  metadata = {
    company   = "Drift Corp."
    plan      = "pro"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0217" {
  name        = "Wei Martinez"
  email       = "wei.martinez@vortexlabs.org"
  phone       = "+4972181143744"
  description = "Vortex Labs Systems — Solutions Architect, custom deployment"

  address {
    line1       = "Friedrichstraße 68"
    line2       = "Office 202"
    city        = "Berlin"
    state       = "Berlin"
    postal_code = "10117"
    country     = "DE"
  }

  shipping {
    name  = "Wei Martinez"
    phone = "+4972181143744"
    address {
      line1       = "Friedrichstraße 68"
      line2       = "Office 202"
      city        = "Berlin"
      state       = "Berlin"
      postal_code = "10117"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0217"

  metadata = {
    company   = "Vortex Labs Systems"
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0218" {
  name        = "Jakub Souza"
  email       = "jakub.souza@ultranode.io"
  phone       = "+56002255794"
  description = "UltraNode ApS — Product Manager, workflow automation"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Floor 5"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Jakub Souza"
    phone = "+56002255794"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Floor 5"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0218"

  metadata = {
    company   = "UltraNode ApS"
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0219" {
  name        = "Fiona Leroy"
  email       = "fiona.leroy@alloy.cloud"
  phone       = "+916212021697"
  description = "Alloy Oy — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Baner Road"
    line2       = "Apt 2A"
    city        = "Pune"
    state       = "Maharashtra"
    postal_code = "411001"
    country     = "IN"
  }

  shipping {
    name  = "Fiona Leroy"
    phone = "+916212021697"
    address {
      line1       = "Baner Road"
      line2       = "Apt 2A"
      city        = "Pune"
      state       = "Maharashtra"
      postal_code = "411001"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0219"

  metadata = {
    company   = "Alloy Oy"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0220" {
  name        = "Lucas Almeida"
  email       = "lucas.almeida@plume.cloud"
  phone       = "+56716701450"
  description = "Plume Consulting — VP of Sales, CRM integration"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Floor 3"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Lucas Almeida"
    phone = "+56716701450"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Floor 3"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0220"

  metadata = {
    company   = "Plume Consulting"
    plan      = "business"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0221" {
  name        = "Beatriz Kriz"
  email       = "beatriz.kriz@wavelength.ai"
  phone       = "+353289002877"
  description = "Wavelength Pty Ltd — VP of Product, expanding to new markets"

  address {
    line1       = "70 South Mall"
    line2       = "Office 505"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Beatriz Kriz"
    phone = "+353289002877"
    address {
      line1       = "70 South Mall"
      line2       = "Office 505"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0221"

  metadata = {
    company   = "Wavelength Pty Ltd"
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0222" {
  name        = "Klaus Kim"
  email       = "klaus.kim@stellarops.ai"
  phone       = "+48317797177"
  description = "StellarOps Pty Ltd — Lead Developer, technical evaluation"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Floor 3"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Klaus Kim"
    phone = "+48317797177"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Floor 3"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0222"

  metadata = {
    company   = "StellarOps Pty Ltd"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0223" {
  name        = "Sean Girard"
  email       = "sean.girard@luminarestudio.io"
  phone       = "+48994883755"
  description = "Luminare Studio SAS — Startup founder, early adopter program"

  address {
    line1       = "ul. Marszalkowska 27"
    line2       = "Tower 1"
    city        = "Warsaw"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Sean Girard"
    phone = "+48994883755"
    address {
      line1       = "ul. Marszalkowska 27"
      line2       = "Tower 1"
      city        = "Warsaw"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0223"

  metadata = {
    company   = "Luminare Studio SAS"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0224" {
  name        = "Krzysztof Owusu"
  email       = "krzysztof.owusu@lambdacore.com"
  phone       = "+33554885102"
  description = "LambdaCore Corp. — Director of IT, compliance focused"

  address {
    line1       = "45 Rue de la Republique"
    line2       = "Floor 20"
    city        = "Lyon"
    postal_code = "69002"
    country     = "FR"
  }

  shipping {
    name  = "Krzysztof Owusu"
    phone = "+33554885102"
    address {
      line1       = "45 Rue de la Republique"
      line2       = "Floor 20"
      city        = "Lyon"
      postal_code = "69002"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0224"

  metadata = {
    company   = "LambdaCore Corp."
    plan      = "enterprise"
    sales_rep = "rtan"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0225" {
  name        = "Josiah Moore"
  email       = "josiah.moore@wander.cloud"
  phone       = "+823516091779"
  description = "Wander Software — Growth Lead, high-velocity team"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Suite 400"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Josiah Moore"
    phone = "+823516091779"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Suite 400"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0225"

  metadata = {
    company   = "Wander Software"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0226" {
  name        = "Hala Fernandez"
  email       = "hala.fernandez@kinesis.org"
  phone       = "+353221699586"
  description = "Kinesis Sp. z o.o. — Head of Payments, fintech integration"

  address {
    line1       = "32 Merrion Square"
    line2       = "Office 202"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Hala Fernandez"
    phone = "+353221699586"
    address {
      line1       = "32 Merrion Square"
      line2       = "Office 202"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0226"

  metadata = {
    company   = "Kinesis Sp. z o.o."
    plan      = "business"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0227" {
  name        = "Aiko Jackson"
  email       = "aiko.jackson@blueprintops.net"
  phone       = "+971583339452"
  description = "BlueprintOps ApS — VP of Sales, CRM integration"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Apt 2A"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Aiko Jackson"
    phone = "+971583339452"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Apt 2A"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0227"

  metadata = {
    company   = "BlueprintOps ApS"
    plan      = "business"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0228" {
  name        = "Rania Gupta"
  email       = "rania.gupta@daybreak.net"
  phone       = "+524608106200"
  description = "Daybreak Sp. z o.o. — Operations Director, multi-year deal"

  address {
    line1       = "Av. Vallarta 2440"
    line2       = "Floor 10"
    city        = "Guadalajara"
    state       = "Jalisco"
    postal_code = "44100"
    country     = "MX"
  }

  shipping {
    name  = "Rania Gupta"
    phone = "+524608106200"
    address {
      line1       = "Av. Vallarta 2440"
      line2       = "Floor 10"
      city        = "Guadalajara"
      state       = "Jalisco"
      postal_code = "44100"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0228"

  metadata = {
    company   = "Daybreak Sp. z o.o."
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0229" {
  name        = "Evelyn Barros"
  email       = "evelyn.barros@drift.com"
  phone       = "+15719838638"
  description = "Drift S.r.l. — VP of Sales, CRM integration"

  address {
    line1       = "1000 Rue De La Gauchetiere"
    line2       = "Apt 6E"
    city        = "Montreal"
    state       = "QC"
    postal_code = "H3B 4W5"
    country     = "CA"
  }

  shipping {
    name  = "Evelyn Barros"
    phone = "+15719838638"
    address {
      line1       = "1000 Rue De La Gauchetiere"
      line2       = "Apt 6E"
      city        = "Montreal"
      state       = "QC"
      postal_code = "H3B 4W5"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0229"

  metadata = {
    company   = "Drift S.r.l."
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0230" {
  name        = "Ahmed Lee"
  email       = "ahmed.lee@peakmindlabs.co"
  phone       = "+56973598933"
  description = "PeakMind Labs Inc. — Staff Engineer, enterprise consultant"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Floor 15"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Ahmed Lee"
    phone = "+56973598933"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Floor 15"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0230"

  metadata = {
    company   = "PeakMind Labs Inc."
    plan      = "pro"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0231" {
  name        = "Thomas Frimpong"
  email       = "thomas.frimpong@tachyonai.ai"
  phone       = "+824842294057"
  description = "TachyonAI Corp. — VP of Sales, CRM integration"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Suite 400"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Thomas Frimpong"
    phone = "+824842294057"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Suite 400"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0231"

  metadata = {
    company   = "TachyonAI Corp."
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0232" {
  name        = "Pablo Shah"
  email       = "pablo.shah@echo.io"
  phone       = "+48583281826"
  description = "Echo Sp. z o.o. — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Unit A"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Pablo Shah"
    phone = "+48583281826"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Unit A"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0232"

  metadata = {
    company   = "Echo Sp. z o.o."
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0233" {
  name        = "Nour Kobayashi"
  email       = "nour.kobayashi@alphawave.net"
  phone       = "+17801573993"
  description = "AlphaWave S.r.l. — Startup founder, early adopter program"

  address {
    line1       = "1000 Rue De La Gauchetiere"
    line2       = "Unit D"
    city        = "Montreal"
    state       = "QC"
    postal_code = "H3B 4W5"
    country     = "CA"
  }

  shipping {
    name  = "Nour Kobayashi"
    phone = "+17801573993"
    address {
      line1       = "1000 Rue De La Gauchetiere"
      line2       = "Unit D"
      city        = "Montreal"
      state       = "QC"
      postal_code = "H3B 4W5"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0233"

  metadata = {
    company   = "AlphaWave S.r.l."
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0234" {
  name        = "Kwesi Boateng"
  email       = "kwesi.boateng@quantumbit.net"
  phone       = "+438770435811"
  description = "QuantumBit Inc. — VP of Product, expanding to new markets"

  address {
    line1       = "Graben 21"
    line2       = "Building A"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Kwesi Boateng"
    phone = "+438770435811"
    address {
      line1       = "Graben 21"
      line2       = "Building A"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0234"

  metadata = {
    company   = "QuantumBit Inc."
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0235" {
  name        = "Riley Hall"
  email       = "riley.hall@wavesync.io"
  phone       = "+572075011024"
  description = "WaveSync Consulting — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Apt 4C"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Riley Hall"
    phone = "+572075011024"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Apt 4C"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0235"

  metadata = {
    company   = "WaveSync Consulting"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0236" {
  name        = "Kenji Dvorak"
  email       = "kenji.dvorak@fusiongrid.ai"
  phone       = "+31180919015"
  description = "FusionGrid ApS — Growth Lead, high-velocity team"

  address {
    line1       = "Dam 1"
    line2       = "Floor 2"
    city        = "Amsterdam"
    state       = "North Holland"
    postal_code = "1012 JS"
    country     = "NL"
  }

  shipping {
    name  = "Kenji Dvorak"
    phone = "+31180919015"
    address {
      line1       = "Dam 1"
      line2       = "Floor 2"
      city        = "Amsterdam"
      state       = "North Holland"
      postal_code = "1012 JS"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0236"

  metadata = {
    company   = "FusionGrid ApS"
    plan      = "business"
    sales_rep = "rtan"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0237" {
  name        = "Fritz Kuznetsov"
  email       = "fritz.kuznetsov@vivid.com"
  phone       = "+827283268424"
  description = "Vivid Oy — Frontend Lead, design system migration"

  address {
    line1       = "55 Jungang-daero, Jung-gu"
    line2       = "Floor 10"
    city        = "Busan"
    state       = "Busan"
    postal_code = "48058"
    country     = "KR"
  }

  shipping {
    name  = "Fritz Kuznetsov"
    phone = "+827283268424"
    address {
      line1       = "55 Jungang-daero, Jung-gu"
      line2       = "Floor 10"
      city        = "Busan"
      state       = "Busan"
      postal_code = "48058"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0237"

  metadata = {
    company   = "Vivid Oy"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0238" {
  name        = "Lillian Weber"
  email       = "lillian.weber@heliosphere.net"
  phone       = "+971814353682"
  description = "Heliosphere Sp. z o.o. — VP of Product, expanding to new markets"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Floor 20"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Lillian Weber"
    phone = "+971814353682"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Floor 20"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0238"

  metadata = {
    company   = "Heliosphere Sp. z o.o."
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0239" {
  name        = "Isaiah Hill"
  email       = "isaiah.hill@outlook.net"
  phone       = "+351781414139"
  description = "Outlook Partners — Director of IT, compliance focused"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Floor 3"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Isaiah Hill"
    phone = "+351781414139"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Floor 3"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0239"

  metadata = {
    company   = "Outlook Partners"
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0240" {
  name        = "Heidi Holm"
  email       = "heidi.holm@skybridgecorp.cloud"
  phone       = "+17594929955"
  description = "SkyBridge Corp Platform — Head of Payments, fintech integration"

  address {
    line1       = "200 Burrard Street"
    line2       = "Unit B"
    city        = "Vancouver"
    state       = "BC"
    postal_code = "V6C 2T6"
    country     = "CA"
  }

  shipping {
    name  = "Heidi Holm"
    phone = "+17594929955"
    address {
      line1       = "200 Burrard Street"
      line2       = "Unit B"
      city        = "Vancouver"
      state       = "BC"
      postal_code = "V6C 2T6"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0240"

  metadata = {
    company   = "SkyBridge Corp Platform"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0241" {
  name        = "Mariana Morales"
  email       = "mariana.morales@kinesis.cloud"
  phone       = "+817754781291"
  description = "Kinesis AG — Managing Director, long-term partnership"

  address {
    line1       = "3-1-1 Umeda, Kita-ku"
    line2       = "Suite 500"
    city        = "Osaka"
    state       = "Osaka"
    postal_code = "530-0001"
    country     = "JP"
  }

  shipping {
    name  = "Mariana Morales"
    phone = "+817754781291"
    address {
      line1       = "3-1-1 Umeda, Kita-ku"
      line2       = "Suite 500"
      city        = "Osaka"
      state       = "Osaka"
      postal_code = "530-0001"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0241"

  metadata = {
    company   = "Kinesis AG"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0242" {
  name        = "Priya Rao"
  email       = "priya.rao@jetpack.org"
  phone       = "+358308488725"
  description = "Jetpack Inc. — CEO, climate tech innovator"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Tower 3"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Priya Rao"
    phone = "+358308488725"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Tower 3"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0242"

  metadata = {
    company   = "Jetpack Inc."
    plan      = "business"
    sales_rep = "twright"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0243" {
  name        = "Zahra Brown"
  email       = "zahra.brown@epsilonai.co"
  phone       = "+4592827229"
  description = "EpsilonAI AG — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Unit B"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Zahra Brown"
    phone = "+4592827229"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Unit B"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0243"

  metadata = {
    company   = "EpsilonAI AG"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0244" {
  name        = "Lin Phillips"
  email       = "lin.phillips@skybridgecorp.com"
  phone       = "+46385677005"
  description = "SkyBridge Corp AB — Head of Engineering, annual contract"

  address {
    line1       = "Kungsgatan 44"
    line2       = "Level 11"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Lin Phillips"
    phone = "+46385677005"
    address {
      line1       = "Kungsgatan 44"
      line2       = "Level 11"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0244"

  metadata = {
    company   = "SkyBridge Corp AB"
    plan      = "business"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0245" {
  name        = "Brooklyn Schulz"
  email       = "brooklyn.schulz@meridian.net"
  phone       = "+46463865577"
  description = "Meridian S.L. — Security Lead, zero-trust implementation"

  address {
    line1       = "Kungsgatan 44"
    line2       = "Unit B"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Brooklyn Schulz"
    phone = "+46463865577"
    address {
      line1       = "Kungsgatan 44"
      line2       = "Unit B"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0245"

  metadata = {
    company   = "Meridian S.L."
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0246" {
  name        = "Scarlett Zhang"
  email       = "scarlett.zhang@lattice.dev"
  phone       = "+12591365177"
  description = "Lattice AB — Director of IT, compliance focused"

  address {
    line1       = "100 King Street West"
    line2       = "Suite 200"
    city        = "Toronto"
    state       = "ON"
    postal_code = "M5H 2N2"
    country     = "CA"
  }

  shipping {
    name  = "Scarlett Zhang"
    phone = "+12591365177"
    address {
      line1       = "100 King Street West"
      line2       = "Suite 200"
      city        = "Toronto"
      state       = "ON"
      postal_code = "M5H 2N2"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0246"

  metadata = {
    company   = "Lattice AB"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0247" {
  name        = "Ming Rossi"
  email       = "ming.rossi@solarwindhq.dev"
  phone       = "+351809202428"
  description = "SolarWind HQ Sp. z o.o. — CEO, climate tech innovator"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Building B"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Ming Rossi"
    phone = "+351809202428"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Building B"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0247"

  metadata = {
    company   = "SolarWind HQ Sp. z o.o."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0248" {
  name        = "Li Reddy"
  email       = "li.reddy@brightpath.org"
  phone       = "+358292984257"
  description = "BrightPath Pty Ltd — Security Lead, zero-trust implementation"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Floor 8"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Li Reddy"
    phone = "+358292984257"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Floor 8"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0248"

  metadata = {
    company   = "BrightPath Pty Ltd"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0249" {
  name        = "Nora Dubois"
  email       = "nora.dubois@fluxwave.dev"
  phone       = "+4791279908"
  description = "FluxWave KG — Growth Lead, high-velocity team"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Level 6"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Nora Dubois"
    phone = "+4791279908"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Level 6"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0249"

  metadata = {
    company   = "FluxWave KG"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0250" {
  name        = "Olivia Novikov"
  email       = "olivia.novikov@pinnacle.tech"
  phone       = "+34086376599"
  description = "Pinnacle Solutions — Head of Engineering, annual contract"

  address {
    line1       = "Passeig de Gracia 11"
    line2       = "Unit B"
    city        = "Barcelona"
    state       = "Catalonia"
    postal_code = "08002"
    country     = "ES"
  }

  shipping {
    name  = "Olivia Novikov"
    phone = "+34086376599"
    address {
      line1       = "Passeig de Gracia 11"
      line2       = "Unit B"
      city        = "Barcelona"
      state       = "Catalonia"
      postal_code = "08002"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0250"

  metadata = {
    company   = "Pinnacle Solutions"
    plan      = "pro"
    sales_rep = "twright"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0251" {
  name        = "Samuel Cook"
  email       = "samuel.cook@foundry.app"
  phone       = "+48300981806"
  description = "Foundry Platform — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Floor 3"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Samuel Cook"
    phone = "+48300981806"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Floor 3"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0251"

  metadata = {
    company   = "Foundry Platform"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0252" {
  name        = "Hazel Fontaine"
  email       = "hazel.fontaine@meridian.net"
  phone       = "+916959463688"
  description = "Meridian Sp. z o.o. — Director of IT, compliance focused"

  address {
    line1       = "HITEC City"
    line2       = "Tower 1"
    city        = "Hyderabad"
    state       = "Telangana"
    postal_code = "500081"
    country     = "IN"
  }

  shipping {
    name  = "Hazel Fontaine"
    phone = "+916959463688"
    address {
      line1       = "HITEC City"
      line2       = "Tower 1"
      city        = "Hyderabad"
      state       = "Telangana"
      postal_code = "500081"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0252"

  metadata = {
    company   = "Meridian Sp. z o.o."
    plan      = "business"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0253" {
  name        = "Ying Bailey"
  email       = "ying.bailey@catalyze.dev"
  phone       = "+886137213865"
  description = "Catalyze AG — Platform Engineer, infrastructure modernization"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Floor 2"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Ying Bailey"
    phone = "+886137213865"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Floor 2"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0253"

  metadata = {
    company   = "Catalyze AG"
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0254" {
  name        = "Anthony Kumar"
  email       = "anthony.kumar@vivid.io"
  phone       = "+34435190669"
  description = "Vivid Technologies — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Paseo de la Castellana 89"
    line2       = "Building B"
    city        = "Madrid"
    state       = "Madrid"
    postal_code = "28014"
    country     = "ES"
  }

  shipping {
    name  = "Anthony Kumar"
    phone = "+34435190669"
    address {
      line1       = "Paseo de la Castellana 89"
      line2       = "Building B"
      city        = "Madrid"
      state       = "Madrid"
      postal_code = "28014"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0254"

  metadata = {
    company   = "Vivid Technologies"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0255" {
  name        = "James Baker"
  email       = "james.baker@luminary.co"
  phone       = "+430988392053"
  description = "Luminary Systems — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Graben 21"
    line2       = "Apt 5D"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "James Baker"
    phone = "+430988392053"
    address {
      line1       = "Graben 21"
      line2       = "Apt 5D"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0255"

  metadata = {
    company   = "Luminary Systems"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0256" {
  name        = "Tomasz Oliveira"
  email       = "tomasz.oliveira@epsilonai.net"
  phone       = "+351011848955"
  description = "EpsilonAI S.L. — Managing Director, long-term partnership"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Level 11"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Tomasz Oliveira"
    phone = "+351011848955"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Level 11"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0256"

  metadata = {
    company   = "EpsilonAI S.L."
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0257" {
  name        = "Emma Collins"
  email       = "emma.collins@cloudnova.net"
  phone       = "+4518451848"
  description = "CloudNova ApS — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Tower 1"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Emma Collins"
    phone = "+4518451848"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Tower 1"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0257"

  metadata = {
    company   = "CloudNova ApS"
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0258" {
  name        = "Ming Lebedev"
  email       = "ming.lebedev@xenonlabs.org"
  phone       = "+390714163356"
  description = "XenonLabs Group — Data Science Lead, analytics use case"

  address {
    line1       = "Via del Corso 300"
    line2       = "Floor 2"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Ming Lebedev"
    phone = "+390714163356"
    address {
      line1       = "Via del Corso 300"
      line2       = "Floor 2"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0258"

  metadata = {
    company   = "XenonLabs Group"
    plan      = "business"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0259" {
  name        = "Connor Pereira"
  email       = "connor.pereira@yellowbrick.net"
  phone       = "+31275539423"
  description = "Yellowbrick Consulting — Director of IT, compliance focused"

  address {
    line1       = "Dam 1"
    line2       = "Unit D"
    city        = "Amsterdam"
    state       = "North Holland"
    postal_code = "1012 JS"
    country     = "NL"
  }

  shipping {
    name  = "Connor Pereira"
    phone = "+31275539423"
    address {
      line1       = "Dam 1"
      line2       = "Unit D"
      city        = "Amsterdam"
      state       = "North Holland"
      postal_code = "1012 JS"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0259"

  metadata = {
    company   = "Yellowbrick Consulting"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0260" {
  name        = "Sakura Gomez"
  email       = "sakura.gomez@fluxwave.tech"
  phone       = "+5521117908075"
  description = "FluxWave Consulting — Security Lead, zero-trust implementation"

  address {
    line1       = "Av. Afonso Pena 1500"
    line2       = "Tower 2"
    city        = "Belo Horizonte"
    state       = "MG"
    postal_code = "30130-003"
    country     = "BR"
  }

  shipping {
    name  = "Sakura Gomez"
    phone = "+5521117908075"
    address {
      line1       = "Av. Afonso Pena 1500"
      line2       = "Tower 2"
      city        = "Belo Horizonte"
      state       = "MG"
      postal_code = "30130-003"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0260"

  metadata = {
    company   = "FluxWave Consulting"
    plan      = "enterprise"
    sales_rep = "rtan"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0261" {
  name        = "Claire Kuznetsov"
  email       = "claire.kuznetsov@unison.co"
  phone       = "+919208678085"
  description = "Unison KG — CEO, climate tech innovator"

  address {
    line1       = "Baner Road"
    line2       = "Building C"
    city        = "Pune"
    state       = "Maharashtra"
    postal_code = "411001"
    country     = "IN"
  }

  shipping {
    name  = "Claire Kuznetsov"
    phone = "+919208678085"
    address {
      line1       = "Baner Road"
      line2       = "Building C"
      city        = "Pune"
      state       = "Maharashtra"
      postal_code = "411001"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0261"

  metadata = {
    company   = "Unison KG"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0262" {
  name        = "Yasmin Barros"
  email       = "yasmin.barros@vortexlabs.ai"
  phone       = "+529155942843"
  description = "Vortex Labs Inc. — Managing Director, long-term partnership"

  address {
    line1       = "Paseo de la Reforma 250"
    line2       = "Tower 2"
    city        = "Mexico City"
    state       = "CDMX"
    postal_code = "06600"
    country     = "MX"
  }

  shipping {
    name  = "Yasmin Barros"
    phone = "+529155942843"
    address {
      line1       = "Paseo de la Reforma 250"
      line2       = "Tower 2"
      city        = "Mexico City"
      state       = "CDMX"
      postal_code = "06600"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0262"

  metadata = {
    company   = "Vortex Labs Inc."
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0263" {
  name        = "Valentina Rivera"
  email       = "valentina.rivera@helixdata.tech"
  phone       = "+886647292931"
  description = "HelixData Digital — Product Manager, workflow automation"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Apt 4C"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Valentina Rivera"
    phone = "+886647292931"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Apt 4C"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0263"

  metadata = {
    company   = "HelixData Digital"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0264" {
  name        = "Kai Martin"
  email       = "kai.martin@fathom.com"
  phone       = "+812672885744"
  description = "Fathom Labs — Platform Engineer, infrastructure modernization"

  address {
    line1       = "4-7-1 Meieki, Nakamura-ku"
    line2       = "Suite 400"
    city        = "Nagoya"
    state       = "Aichi"
    postal_code = "460-0008"
    country     = "JP"
  }

  shipping {
    name  = "Kai Martin"
    phone = "+812672885744"
    address {
      line1       = "4-7-1 Meieki, Nakamura-ku"
      line2       = "Suite 400"
      city        = "Nagoya"
      state       = "Aichi"
      postal_code = "460-0008"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0264"

  metadata = {
    company   = "Fathom Labs"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0265" {
  name        = "Ravi Edwards"
  email       = "ravi.edwards@omicronai.cloud"
  phone       = "+972545588450"
  description = "OmicronAI Consulting — Head of Payments, fintech integration"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Floor 20"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Ravi Edwards"
    phone = "+972545588450"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Floor 20"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0265"

  metadata = {
    company   = "OmicronAI Consulting"
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0266" {
  name        = "Alma Lim"
  email       = "alma.lim@meridian.app"
  phone       = "+48558771694"
  description = "Meridian Solutions — Solutions Architect, custom deployment"

  address {
    line1       = "ul. Marszalkowska 27"
    line2       = "Apt 6E"
    city        = "Warsaw"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Alma Lim"
    phone = "+48558771694"
    address {
      line1       = "ul. Marszalkowska 27"
      line2       = "Apt 6E"
      city        = "Warsaw"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0266"

  metadata = {
    company   = "Meridian Solutions"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0267" {
  name        = "Axel Roux"
  email       = "axel.roux@luminary.dev"
  phone       = "+4953554496475"
  description = "Luminary Ventures — Product Manager, workflow automation"

  address {
    line1       = "Friedrichstraße 68"
    line2       = "Suite 200"
    city        = "Berlin"
    state       = "Berlin"
    postal_code = "10117"
    country     = "DE"
  }

  shipping {
    name  = "Axel Roux"
    phone = "+4953554496475"
    address {
      line1       = "Friedrichstraße 68"
      line2       = "Suite 200"
      city        = "Berlin"
      state       = "Berlin"
      postal_code = "10117"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0267"

  metadata = {
    company   = "Luminary Ventures"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0268" {
  name        = "Asher Osei"
  email       = "asher.osei@kineticai.co"
  phone       = "+912611178006"
  description = "KineticAI Systems — Growth Lead, high-velocity team"

  address {
    line1       = "Embassy Tech Village"
    line2       = "Floor 10"
    city        = "Bengaluru"
    state       = "Karnataka"
    postal_code = "560103"
    country     = "IN"
  }

  shipping {
    name  = "Asher Osei"
    phone = "+912611178006"
    address {
      line1       = "Embassy Tech Village"
      line2       = "Floor 10"
      city        = "Bengaluru"
      state       = "Karnataka"
      postal_code = "560103"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0268"

  metadata = {
    company   = "KineticAI Systems"
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0269" {
  name        = "Aria Pokorny"
  email       = "aria.pokorny@wander.co"
  phone       = "+823472282005"
  description = "Wander Platform — Lead Developer, technical evaluation"

  address {
    line1       = "55 Jungang-daero, Jung-gu"
    line2       = "Level 9"
    city        = "Busan"
    state       = "Busan"
    postal_code = "48058"
    country     = "KR"
  }

  shipping {
    name  = "Aria Pokorny"
    phone = "+823472282005"
    address {
      line1       = "55 Jungang-daero, Jung-gu"
      line2       = "Level 9"
      city        = "Busan"
      state       = "Busan"
      postal_code = "48058"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0269"

  metadata = {
    company   = "Wander Platform"
    plan      = "enterprise"
    sales_rep = "rtan"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0270" {
  name        = "Julia Jackson"
  email       = "julia.jackson@beacon.org"
  phone       = "+48979688457"
  description = "Beacon Digital — Platform Engineer, infrastructure modernization"

  address {
    line1       = "ul. Marszalkowska 27"
    line2       = "Apt 3B"
    city        = "Warsaw"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Julia Jackson"
    phone = "+48979688457"
    address {
      line1       = "ul. Marszalkowska 27"
      line2       = "Apt 3B"
      city        = "Warsaw"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0270"

  metadata = {
    company   = "Beacon Digital"
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0271" {
  name        = "Giulia Collins"
  email       = "giulia.collins@jadepathventures.net"
  phone       = "+12547807740"
  description = "JadePath Ventures S.r.l. — Backend Engineer, API integration project"

  address {
    line1       = "101 California Street"
    line2       = "Suite 100"
    city        = "San Francisco"
    state       = "CA"
    postal_code = "94107"
    country     = "US"
  }

  shipping {
    name  = "Giulia Collins"
    phone = "+12547807740"
    address {
      line1       = "101 California Street"
      line2       = "Suite 100"
      city        = "San Francisco"
      state       = "CA"
      postal_code = "94107"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0271"

  metadata = {
    company   = "JadePath Ventures S.r.l."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0272" {
  name        = "Tariq Hoffmann"
  email       = "tariq.hoffmann@echovault.ai"
  phone       = "+41326634163"
  description = "EchoVault ApS — Growth Lead, high-velocity team"

  address {
    line1       = "Rue du Rhone 50"
    line2       = "Office 101"
    city        = "Geneva"
    state       = "GE"
    postal_code = "1201"
    country     = "CH"
  }

  shipping {
    name  = "Tariq Hoffmann"
    phone = "+41326634163"
    address {
      line1       = "Rue du Rhone 50"
      line2       = "Office 101"
      city        = "Geneva"
      state       = "GE"
      postal_code = "1201"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0272"

  metadata = {
    company   = "EchoVault ApS"
    plan      = "business"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0273" {
  name        = "Giulia Green"
  email       = "giulia.green@mosaic.app"
  phone       = "+61179749735"
  description = "Mosaic Ltd. — Enterprise client, onboarded Q3 2024"

  address {
    line1       = "1 Macquarie Place"
    line2       = "Floor 15"
    city        = "Sydney"
    state       = "NSW"
    postal_code = "2000"
    country     = "AU"
  }

  shipping {
    name  = "Giulia Green"
    phone = "+61179749735"
    address {
      line1       = "1 Macquarie Place"
      line2       = "Floor 15"
      city        = "Sydney"
      state       = "NSW"
      postal_code = "2000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0273"

  metadata = {
    company   = "Mosaic Ltd."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0274" {
  name        = "Jaxon Cook"
  email       = "jaxon.cook@opticore.com"
  phone       = "+573120735647"
  description = "OptiCore GmbH — Data Science Lead, analytics use case"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Floor 10"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Jaxon Cook"
    phone = "+573120735647"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Floor 10"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0274"

  metadata = {
    company   = "OptiCore GmbH"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0275" {
  name        = "Elijah Stewart"
  email       = "elijah.stewart@cipher.dev"
  phone       = "+4934601367303"
  description = "Cipher S.L. — Solutions Architect, custom deployment"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Office 303"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Elijah Stewart"
    phone = "+4934601367303"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Office 303"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0275"

  metadata = {
    company   = "Cipher S.L."
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0276" {
  name        = "Amira Allen"
  email       = "amira.allen@jetpack.net"
  phone       = "+441474350313"
  description = "Jetpack Labs — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "2 Colmore Row"
    line2       = "Office 101"
    city        = "Birmingham"
    state       = "England"
    postal_code = "B3 2BJ"
    country     = "GB"
  }

  shipping {
    name  = "Amira Allen"
    phone = "+441474350313"
    address {
      line1       = "2 Colmore Row"
      line2       = "Office 101"
      city        = "Birmingham"
      state       = "England"
      postal_code = "B3 2BJ"
      country     = "GB"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0276"

  metadata = {
    company   = "Jetpack Labs"
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0277" {
  name        = "Wilma Moore"
  email       = "wilma.moore@epsilonai.com"
  phone       = "+5597925132719"
  description = "EpsilonAI Partners — Lead Developer, technical evaluation"

  address {
    line1       = "Av. Paulista 1578"
    line2       = "Level 6"
    city        = "Sao Paulo"
    state       = "SP"
    postal_code = "01310-200"
    country     = "BR"
  }

  shipping {
    name  = "Wilma Moore"
    phone = "+5597925132719"
    address {
      line1       = "Av. Paulista 1578"
      line2       = "Level 6"
      city        = "Sao Paulo"
      state       = "SP"
      postal_code = "01310-200"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0277"

  metadata = {
    company   = "EpsilonAI Partners"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0278" {
  name        = "Grayson Anderson"
  email       = "grayson.anderson@quasarhq.cloud"
  phone       = "+31306524077"
  description = "QuasarHQ Pty Ltd — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Coolsingel 40"
    line2       = "Floor 15"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Grayson Anderson"
    phone = "+31306524077"
    address {
      line1       = "Coolsingel 40"
      line2       = "Floor 15"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0278"

  metadata = {
    company   = "QuasarHQ Pty Ltd"
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0279" {
  name        = "Kojo Shimizu"
  email       = "kojo.shimizu@velocloud.org"
  phone       = "+398218274485"
  description = "VeloCloud Labs — Solutions Architect, custom deployment"

  address {
    line1       = "Via del Corso 300"
    line2       = "Suite 200"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Kojo Shimizu"
    phone = "+398218274485"
    address {
      line1       = "Via del Corso 300"
      line2       = "Suite 200"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0279"

  metadata = {
    company   = "VeloCloud Labs"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0280" {
  name        = "Krzysztof Novikov"
  email       = "krzysztof.novikov@ignite.net"
  phone       = "+31638782945"
  description = "Ignite Pty Ltd — Head of Payments, fintech integration"

  address {
    line1       = "Dam 1"
    line2       = "Suite 500"
    city        = "Amsterdam"
    state       = "North Holland"
    postal_code = "1012 JS"
    country     = "NL"
  }

  shipping {
    name  = "Krzysztof Novikov"
    phone = "+31638782945"
    address {
      line1       = "Dam 1"
      line2       = "Suite 500"
      city        = "Amsterdam"
      state       = "North Holland"
      postal_code = "1012 JS"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0280"

  metadata = {
    company   = "Ignite Pty Ltd"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0281" {
  name        = "Mason Thomas"
  email       = "mason.thomas@cloudnova.io"
  phone       = "+447310967899"
  description = "CloudNova Software — Managing Director, long-term partnership"

  address {
    line1       = "3 Hardman Street"
    line2       = "Suite 500"
    city        = "Manchester"
    state       = "England"
    postal_code = "M1 3HZ"
    country     = "GB"
  }

  shipping {
    name  = "Mason Thomas"
    phone = "+447310967899"
    address {
      line1       = "3 Hardman Street"
      line2       = "Suite 500"
      city        = "Manchester"
      state       = "England"
      postal_code = "M1 3HZ"
      country     = "GB"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0281"

  metadata = {
    company   = "CloudNova Software"
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0282" {
  name        = "Aisha Rivera"
  email       = "aisha.rivera@meridian.cloud"
  phone       = "+430586509480"
  description = "Meridian A/S — Product Manager, workflow automation"

  address {
    line1       = "Graben 21"
    line2       = "Level 4"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Aisha Rivera"
    phone = "+430586509480"
    address {
      line1       = "Graben 21"
      line2       = "Level 4"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0282"

  metadata = {
    company   = "Meridian A/S"
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0283" {
  name        = "Penelope Garcia"
  email       = "penelope.garcia@vertex.co"
  phone       = "+48383928861"
  description = "Vertex Pty Ltd — Backend Engineer, API integration project"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Floor 3"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Penelope Garcia"
    phone = "+48383928861"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Floor 3"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0283"

  metadata = {
    company   = "Vertex Pty Ltd"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0284" {
  name        = "Savannah Hill"
  email       = "savannah.hill@zephyrcloud.dev"
  phone       = "+4589755855"
  description = "ZephyrCloud S.L. — Head of Payments, fintech integration"

  address {
    line1       = "Store Torv 4"
    line2       = "Level 11"
    city        = "Aarhus"
    postal_code = "8000"
    country     = "DK"
  }

  shipping {
    name  = "Savannah Hill"
    phone = "+4589755855"
    address {
      line1       = "Store Torv 4"
      line2       = "Level 11"
      city        = "Aarhus"
      postal_code = "8000"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0284"

  metadata = {
    company   = "ZephyrCloud S.L."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0285" {
  name        = "Afua Campbell"
  email       = "afua.campbell@coresync.tech"
  phone       = "+48776004908"
  description = "CoreSync Group — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Unit A"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Afua Campbell"
    phone = "+48776004908"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Unit A"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0285"

  metadata = {
    company   = "CoreSync Group"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0286" {
  name        = "Yasmin Sullivan"
  email       = "yasmin.sullivan@bloom.net"
  phone       = "+578899210752"
  description = "Bloom Consulting — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Unit B"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Yasmin Sullivan"
    phone = "+578899210752"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Unit B"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0286"

  metadata = {
    company   = "Bloom Consulting"
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0287" {
  name        = "Marie Cooper"
  email       = "marie.cooper@terraflux.io"
  phone       = "+825727919409"
  description = "TerraFlux Sp. z o.o. — CEO, climate tech innovator"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Building A"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Marie Cooper"
    phone = "+825727919409"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Building A"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0287"

  metadata = {
    company   = "TerraFlux Sp. z o.o."
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0288" {
  name        = "Francesca Moore"
  email       = "francesca.moore@orchid.org"
  phone       = "+5506048058925"
  description = "Orchid Group — Growth Lead, high-velocity team"

  address {
    line1       = "Av. Afonso Pena 1500"
    line2       = "Building B"
    city        = "Belo Horizonte"
    state       = "MG"
    postal_code = "30130-003"
    country     = "BR"
  }

  shipping {
    name  = "Francesca Moore"
    phone = "+5506048058925"
    address {
      line1       = "Av. Afonso Pena 1500"
      line2       = "Building B"
      city        = "Belo Horizonte"
      state       = "MG"
      postal_code = "30130-003"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0288"

  metadata = {
    company   = "Orchid Group"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0289" {
  name        = "Nils Rao"
  email       = "nils.rao@terraflux.ai"
  phone       = "+34225179086"
  description = "TerraFlux Pty Ltd — Managing Director, long-term partnership"

  address {
    line1       = "Passeig de Gracia 11"
    line2       = "Floor 8"
    city        = "Barcelona"
    state       = "Catalonia"
    postal_code = "08002"
    country     = "ES"
  }

  shipping {
    name  = "Nils Rao"
    phone = "+34225179086"
    address {
      line1       = "Passeig de Gracia 11"
      line2       = "Floor 8"
      city        = "Barcelona"
      state       = "Catalonia"
      postal_code = "08002"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0289"

  metadata = {
    company   = "TerraFlux Pty Ltd"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0290" {
  name        = "Ellie Reddy"
  email       = "ellie.reddy@arclight.org"
  phone       = "+353389833146"
  description = "ArcLight B.V. — Lead Developer, technical evaluation"

  address {
    line1       = "70 South Mall"
    line2       = "Building A"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Ellie Reddy"
    phone = "+353389833146"
    address {
      line1       = "70 South Mall"
      line2       = "Building A"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0290"

  metadata = {
    company   = "ArcLight B.V."
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0291" {
  name        = "Natalia Shimizu"
  email       = "natalia.shimizu@echovault.app"
  phone       = "+46259792703"
  description = "EchoVault Co. — Operations Director, multi-year deal"

  address {
    line1       = "Kungsgatan 44"
    line2       = "Floor 5"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Natalia Shimizu"
    phone = "+46259792703"
    address {
      line1       = "Kungsgatan 44"
      line2       = "Floor 5"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0291"

  metadata = {
    company   = "EchoVault Co."
    plan      = "pro"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0292" {
  name        = "Amelia Diaz"
  email       = "amelia.diaz@yonder.app"
  phone       = "+430514770538"
  description = "Yonder Technologies — Operations Director, multi-year deal"

  address {
    line1       = "Graben 21"
    line2       = "Floor 10"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Amelia Diaz"
    phone = "+430514770538"
    address {
      line1       = "Graben 21"
      line2       = "Floor 10"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0292"

  metadata = {
    company   = "Yonder Technologies"
    plan      = "business"
    sales_rep = "twright"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0293" {
  name        = "Priya Schulz"
  email       = "priya.schulz@daybreak.app"
  phone       = "+522043940701"
  description = "Daybreak Platform — CEO, climate tech innovator"

  address {
    line1       = "Paseo de la Reforma 250"
    line2       = "Office 202"
    city        = "Mexico City"
    state       = "CDMX"
    postal_code = "06600"
    country     = "MX"
  }

  shipping {
    name  = "Priya Schulz"
    phone = "+522043940701"
    address {
      line1       = "Paseo de la Reforma 250"
      line2       = "Office 202"
      city        = "Mexico City"
      state       = "CDMX"
      postal_code = "06600"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0293"

  metadata = {
    company   = "Daybreak Platform"
    plan      = "business"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0294" {
  name        = "Olga Phillips"
  email       = "olga.phillips@crux.tech"
  phone       = "+4579812387"
  description = "Crux S.L. — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Office 303"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Olga Phillips"
    phone = "+4579812387"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Office 303"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0294"

  metadata = {
    company   = "Crux S.L."
    plan      = "starter"
    sales_rep = "slee"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0295" {
  name        = "Olaf Shah"
  email       = "olaf.shah@epsilonai.tech"
  phone       = "+61554384046"
  description = "EpsilonAI Labs — Enterprise client, onboarded Q1 2025"

  address {
    line1       = "1 Macquarie Place"
    line2       = "Apt 5D"
    city        = "Sydney"
    state       = "NSW"
    postal_code = "2000"
    country     = "AU"
  }

  shipping {
    name  = "Olaf Shah"
    phone = "+61554384046"
    address {
      line1       = "1 Macquarie Place"
      line2       = "Apt 5D"
      city        = "Sydney"
      state       = "NSW"
      postal_code = "2000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0295"

  metadata = {
    company   = "EpsilonAI Labs"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0296" {
  name        = "Luke Williams"
  email       = "luke.williams@wavelength.ai"
  phone       = "+4539264957"
  description = "Wavelength S.L. — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Level 14"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Luke Williams"
    phone = "+4539264957"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Level 14"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0296"

  metadata = {
    company   = "Wavelength S.L."
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0297" {
  name        = "Adwoa Almeida"
  email       = "adwoa.almeida@fathom.app"
  phone       = "+4782629251"
  description = "Fathom B.V. — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Suite 200"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Adwoa Almeida"
    phone = "+4782629251"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Suite 200"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0297"

  metadata = {
    company   = "Fathom B.V."
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0298" {
  name        = "Leila Girard"
  email       = "leila.girard@alloy.app"
  phone       = "+6523122099"
  description = "Alloy ApS — Managing Director, long-term partnership"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Apt 2A"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Leila Girard"
    phone = "+6523122099"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Apt 2A"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0298"

  metadata = {
    company   = "Alloy ApS"
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0299" {
  name        = "Owen Barros"
  email       = "owen.barros@cipher.tech"
  phone       = "+812677223306"
  description = "Cipher A/S — Backend Engineer, API integration project"

  address {
    line1       = "4-7-1 Meieki, Nakamura-ku"
    line2       = "Floor 20"
    city        = "Nagoya"
    state       = "Aichi"
    postal_code = "460-0008"
    country     = "JP"
  }

  shipping {
    name  = "Owen Barros"
    phone = "+812677223306"
    address {
      line1       = "4-7-1 Meieki, Nakamura-ku"
      line2       = "Floor 20"
      city        = "Nagoya"
      state       = "Aichi"
      postal_code = "460-0008"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0299"

  metadata = {
    company   = "Cipher A/S"
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0300" {
  name        = "Kenji Costa"
  email       = "kenji.costa@cloudnova.tech"
  phone       = "+397366096569"
  description = "CloudNova Ventures — Product Manager, workflow automation"

  address {
    line1       = "Via del Corso 300"
    line2       = "Suite 300"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Kenji Costa"
    phone = "+397366096569"
    address {
      line1       = "Via del Corso 300"
      line2       = "Suite 300"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0300"

  metadata = {
    company   = "CloudNova Ventures"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0301" {
  name        = "Lan Li"
  email       = "lan.li@wavesync.net"
  phone       = "+56680347644"
  description = "WaveSync S.L. — Solutions Architect, custom deployment"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Suite 400"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Lan Li"
    phone = "+56680347644"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Suite 400"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0301"

  metadata = {
    company   = "WaveSync S.L."
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0302" {
  name        = "Amir Harris"
  email       = "amir.harris@neutronops.io"
  phone       = "+972812982665"
  description = "NeutronOps Consulting — Solutions Architect, custom deployment"

  address {
    line1       = "HaMasger St 30"
    line2       = "Floor 20"
    city        = "Herzliya"
    postal_code = "4672815"
    country     = "IL"
  }

  shipping {
    name  = "Amir Harris"
    phone = "+972812982665"
    address {
      line1       = "HaMasger St 30"
      line2       = "Floor 20"
      city        = "Herzliya"
      postal_code = "4672815"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0302"

  metadata = {
    company   = "NeutronOps Consulting"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0303" {
  name        = "Ren Brown"
  email       = "ren.brown@mindforge.io"
  phone       = "+571175186892"
  description = "MindForge Co. — CEO, climate tech innovator"

  address {
    line1       = "Carrera 7 No. 71-52"
    line2       = "Level 11"
    city        = "Bogota"
    state       = "Cundinamarca"
    postal_code = "110111"
    country     = "CO"
  }

  shipping {
    name  = "Ren Brown"
    phone = "+571175186892"
    address {
      line1       = "Carrera 7 No. 71-52"
      line2       = "Level 11"
      city        = "Bogota"
      state       = "Cundinamarca"
      postal_code = "110111"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0303"

  metadata = {
    company   = "MindForge Co."
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0304" {
  name        = "Dylan King"
  email       = "dylan.king@orchid.com"
  phone       = "+61644742123"
  description = "Orchid GmbH — Enterprise client, onboarded Q1 2025"

  address {
    line1       = "100 Eagle Street"
    line2       = "Tower 2"
    city        = "Brisbane"
    state       = "QLD"
    postal_code = "4000"
    country     = "AU"
  }

  shipping {
    name  = "Dylan King"
    phone = "+61644742123"
    address {
      line1       = "100 Eagle Street"
      line2       = "Tower 2"
      city        = "Brisbane"
      state       = "QLD"
      postal_code = "4000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0304"

  metadata = {
    company   = "Orchid GmbH"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0305" {
  name        = "Kojo Nakamura"
  email       = "kojo.nakamura@glyph.co"
  phone       = "+353977671990"
  description = "Glyph Platform — Co-founder, Series A funded"

  address {
    line1       = "32 Merrion Square"
    line2       = "Floor 10"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Kojo Nakamura"
    phone = "+353977671990"
    address {
      line1       = "32 Merrion Square"
      line2       = "Floor 10"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0305"

  metadata = {
    company   = "Glyph Platform"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0306" {
  name        = "Elijah Pokorny"
  email       = "elijah.pokorny@yieldmax.org"
  phone       = "+819451016224"
  description = "YieldMax LLC — Security Lead, zero-trust implementation"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Apt 3B"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Elijah Pokorny"
    phone = "+819451016224"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Apt 3B"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0306"

  metadata = {
    company   = "YieldMax LLC"
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0307" {
  name        = "Alexander Brown"
  email       = "alexander.brown@bloom.ai"
  phone       = "+31168147214"
  description = "Bloom S.r.l. — Lead Developer, technical evaluation"

  address {
    line1       = "Coolsingel 40"
    line2       = "Suite 400"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Alexander Brown"
    phone = "+31168147214"
    address {
      line1       = "Coolsingel 40"
      line2       = "Suite 400"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0307"

  metadata = {
    company   = "Bloom S.r.l."
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0308" {
  name        = "Nora Jang"
  email       = "nora.jang@wavelength.cloud"
  phone       = "+4594695489"
  description = "Wavelength Solutions — Security Lead, zero-trust implementation"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Tower 2"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Nora Jang"
    phone = "+4594695489"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Tower 2"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0308"

  metadata = {
    company   = "Wavelength Solutions"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0309" {
  name        = "Darius Osei"
  email       = "darius.osei@jetpack.org"
  phone       = "+353343010713"
  description = "Jetpack A/S — Security Lead, zero-trust implementation"

  address {
    line1       = "32 Merrion Square"
    line2       = "Apt 2A"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Darius Osei"
    phone = "+353343010713"
    address {
      line1       = "32 Merrion Square"
      line2       = "Apt 2A"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0309"

  metadata = {
    company   = "Jetpack A/S"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0310" {
  name        = "Samir Kral"
  email       = "samir.kral@hyperloop.app"
  phone       = "+972414488501"
  description = "HyperLoop Inc. — Frontend Lead, design system migration"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Suite 200"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Samir Kral"
    phone = "+972414488501"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Suite 200"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0310"

  metadata = {
    company   = "HyperLoop Inc."
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0311" {
  name        = "Brooklyn Adams"
  email       = "brooklyn.adams@warpdrive.cloud"
  phone       = "+31027278576"
  description = "WarpDrive Consulting — Product Manager, workflow automation"

  address {
    line1       = "Coolsingel 40"
    line2       = "Level 9"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Brooklyn Adams"
    phone = "+31027278576"
    address {
      line1       = "Coolsingel 40"
      line2       = "Level 9"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0311"

  metadata = {
    company   = "WarpDrive Consulting"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0312" {
  name        = "Yaw Dubois"
  email       = "yaw.dubois@gridpoint.tech"
  phone       = "+521240568299"
  description = "GridPoint Sp. z o.o. — CEO, climate tech innovator"

  address {
    line1       = "Av. Vallarta 2440"
    line2       = "Suite 300"
    city        = "Guadalajara"
    state       = "Jalisco"
    postal_code = "44100"
    country     = "MX"
  }

  shipping {
    name  = "Yaw Dubois"
    phone = "+521240568299"
    address {
      line1       = "Av. Vallarta 2440"
      line2       = "Suite 300"
      city        = "Guadalajara"
      state       = "Jalisco"
      postal_code = "44100"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0312"

  metadata = {
    company   = "GridPoint Sp. z o.o."
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0313" {
  name        = "Lea Girard"
  email       = "lea.girard@terraflux.tech"
  phone       = "+41743842150"
  description = "TerraFlux A/S — Backend Engineer, API integration project"

  address {
    line1       = "Bahnhofstrasse 10"
    line2       = "Suite 200"
    city        = "Zurich"
    state       = "ZH"
    postal_code = "8001"
    country     = "CH"
  }

  shipping {
    name  = "Lea Girard"
    phone = "+41743842150"
    address {
      line1       = "Bahnhofstrasse 10"
      line2       = "Suite 200"
      city        = "Zurich"
      state       = "ZH"
      postal_code = "8001"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0313"

  metadata = {
    company   = "TerraFlux A/S"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0314" {
  name        = "Wu Iyer"
  email       = "wu.iyer@jadepathventures.net"
  phone       = "+31452182307"
  description = "JadePath Ventures B.V. — CEO, climate tech innovator"

  address {
    line1       = "Coolsingel 40"
    line2       = "Floor 2"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Wu Iyer"
    phone = "+31452182307"
    address {
      line1       = "Coolsingel 40"
      line2       = "Floor 2"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0314"

  metadata = {
    company   = "JadePath Ventures B.V."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0315" {
  name        = "Olaf Castro"
  email       = "olaf.castro@quill.com"
  phone       = "+33943533448"
  description = "Quill LLC — Lead Developer, technical evaluation"

  address {
    line1       = "8 La Canebiere"
    line2       = "Floor 12"
    city        = "Marseille"
    postal_code = "13001"
    country     = "FR"
  }

  shipping {
    name  = "Olaf Castro"
    phone = "+33943533448"
    address {
      line1       = "8 La Canebiere"
      line2       = "Floor 12"
      city        = "Marseille"
      postal_code = "13001"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0315"

  metadata = {
    company   = "Quill LLC"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0316" {
  name        = "Hans Wilson"
  email       = "hans.wilson@vortexlabs.co"
  phone       = "+48858542493"
  description = "Vortex Labs Technologies — VP of Product, expanding to new markets"

  address {
    line1       = "ul. Marszalkowska 27"
    line2       = "Level 6"
    city        = "Warsaw"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Hans Wilson"
    phone = "+48858542493"
    address {
      line1       = "ul. Marszalkowska 27"
      line2       = "Level 6"
      city        = "Warsaw"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0316"

  metadata = {
    company   = "Vortex Labs Technologies"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0317" {
  name        = "Julia Kim"
  email       = "julia.kim@solarwindhq.io"
  phone       = "+353601662997"
  description = "SolarWind HQ Inc. — Security Lead, zero-trust implementation"

  address {
    line1       = "32 Merrion Square"
    line2       = "Level 6"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Julia Kim"
    phone = "+353601662997"
    address {
      line1       = "32 Merrion Square"
      line2       = "Level 6"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0317"

  metadata = {
    company   = "SolarWind HQ Inc."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0318" {
  name        = "Owen Lebedev"
  email       = "owen.lebedev@aeris.io"
  phone       = "+351717477332"
  description = "Aeris Oy — Security Lead, zero-trust implementation"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Office 505"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Owen Lebedev"
    phone = "+351717477332"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Office 505"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0318"

  metadata = {
    company   = "Aeris Oy"
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0319" {
  name        = "Khalid Jimenez"
  email       = "khalid.jimenez@quasarhq.io"
  phone       = "+4957724599281"
  description = "QuasarHQ Inc. — CEO, climate tech innovator"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Office 303"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Khalid Jimenez"
    phone = "+4957724599281"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Office 303"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0319"

  metadata = {
    company   = "QuasarHQ Inc."
    plan      = "business"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0320" {
  name        = "Kwame Vargas"
  email       = "kwame.vargas@fusiongrid.org"
  phone       = "+34382761539"
  description = "FusionGrid Sp. z o.o. — Head of Payments, fintech integration"

  address {
    line1       = "Paseo de la Castellana 89"
    line2       = "Floor 15"
    city        = "Madrid"
    state       = "Madrid"
    postal_code = "28014"
    country     = "ES"
  }

  shipping {
    name  = "Kwame Vargas"
    phone = "+34382761539"
    address {
      line1       = "Paseo de la Castellana 89"
      line2       = "Floor 15"
      city        = "Madrid"
      state       = "Madrid"
      postal_code = "28014"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0320"

  metadata = {
    company   = "FusionGrid Sp. z o.o."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0321" {
  name        = "Scarlett Adjei"
  email       = "scarlett.adjei@wander.io"
  phone       = "+351997581724"
  description = "Wander Digital — CEO, climate tech innovator"

  address {
    line1       = "Rua de Santa Catarina 112"
    line2       = "Apt 4C"
    city        = "Porto"
    postal_code = "4000-322"
    country     = "PT"
  }

  shipping {
    name  = "Scarlett Adjei"
    phone = "+351997581724"
    address {
      line1       = "Rua de Santa Catarina 112"
      line2       = "Apt 4C"
      city        = "Porto"
      postal_code = "4000-322"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0321"

  metadata = {
    company   = "Wander Digital"
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0322" {
  name        = "Sara Chopra"
  email       = "sara.chopra@lattice.co"
  phone       = "+442902278469"
  description = "Lattice Systems — Chief Revenue Officer, revenue operations"

  address {
    line1       = "1 Poultry"
    line2       = "Office 303"
    city        = "London"
    state       = "England"
    postal_code = "EC2V 8AS"
    country     = "GB"
  }

  shipping {
    name  = "Sara Chopra"
    phone = "+442902278469"
    address {
      line1       = "1 Poultry"
      line2       = "Office 303"
      city        = "London"
      state       = "England"
      postal_code = "EC2V 8AS"
      country     = "GB"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0322"

  metadata = {
    company   = "Lattice Systems"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0323" {
  name        = "Elsa Souza"
  email       = "elsa.souza@synapseio.tech"
  phone       = "+431909862405"
  description = "SynapseIO Ventures — Platform Engineer, infrastructure modernization"

  address {
    line1       = "Graben 21"
    line2       = "Apt 2A"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Elsa Souza"
    phone = "+431909862405"
    address {
      line1       = "Graben 21"
      line2       = "Apt 2A"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0323"

  metadata = {
    company   = "SynapseIO Ventures"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0324" {
  name        = "Levi Cook"
  email       = "levi.cook@nimbus.org"
  phone       = "+5565666683272"
  description = "Nimbus Inc. — Operations Director, multi-year deal"

  address {
    line1       = "Av. Rio Branco 156"
    line2       = "Office 202"
    city        = "Rio de Janeiro"
    state       = "RJ"
    postal_code = "20040-020"
    country     = "BR"
  }

  shipping {
    name  = "Levi Cook"
    phone = "+5565666683272"
    address {
      line1       = "Av. Rio Branco 156"
      line2       = "Office 202"
      city        = "Rio de Janeiro"
      state       = "RJ"
      postal_code = "20040-020"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0324"

  metadata = {
    company   = "Nimbus Inc."
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0325" {
  name        = "Asher Jackson"
  email       = "asher.jackson@vortexlabs.dev"
  phone       = "+972762126796"
  description = "Vortex Labs Ltd. — Security Lead, zero-trust implementation"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Level 9"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Asher Jackson"
    phone = "+972762126796"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Level 9"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0325"

  metadata = {
    company   = "Vortex Labs Ltd."
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0326" {
  name        = "Kenji Richter"
  email       = "kenji.richter@zenithops.org"
  phone       = "+61097384689"
  description = "ZenithOps Pty Ltd — Data Science Lead, analytics use case"

  address {
    line1       = "120 Collins Street"
    line2       = "Apt 3B"
    city        = "Melbourne"
    state       = "VIC"
    postal_code = "3000"
    country     = "AU"
  }

  shipping {
    name  = "Kenji Richter"
    phone = "+61097384689"
    address {
      line1       = "120 Collins Street"
      line2       = "Apt 3B"
      city        = "Melbourne"
      state       = "VIC"
      postal_code = "3000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0326"

  metadata = {
    company   = "ZenithOps Pty Ltd"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0327" {
  name        = "Lily Han"
  email       = "lily.han@pulsenet.net"
  phone       = "+4947818913718"
  description = "PulseNet Digital — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Marienplatz 1"
    line2       = "Suite 100"
    city        = "Munich"
    state       = "Bavaria"
    postal_code = "80331"
    country     = "DE"
  }

  shipping {
    name  = "Lily Han"
    phone = "+4947818913718"
    address {
      line1       = "Marienplatz 1"
      line2       = "Suite 100"
      city        = "Munich"
      state       = "Bavaria"
      postal_code = "80331"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0327"

  metadata = {
    company   = "PulseNet Digital"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0328" {
  name        = "Chen Jimenez"
  email       = "chen.jimenez@tachyonai.ai"
  phone       = "+353544209494"
  description = "TachyonAI Platform — Startup founder, early adopter program"

  address {
    line1       = "70 South Mall"
    line2       = "Office 202"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Chen Jimenez"
    phone = "+353544209494"
    address {
      line1       = "70 South Mall"
      line2       = "Office 202"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0328"

  metadata = {
    company   = "TachyonAI Platform"
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0329" {
  name        = "Fatima Rogers"
  email       = "fatima.rogers@quasarhq.app"
  phone       = "+814294440192"
  description = "QuasarHQ Ltd. — Chief Revenue Officer, revenue operations"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Unit D"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Fatima Rogers"
    phone = "+814294440192"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Unit D"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0329"

  metadata = {
    company   = "QuasarHQ Ltd."
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0330" {
  name        = "Wei Jain"
  email       = "wei.jain@datapulse.tech"
  phone       = "+4512927663"
  description = "DataPulse Partners — Frontend Lead, design system migration"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Apt 2A"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Wei Jain"
    phone = "+4512927663"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Apt 2A"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0330"

  metadata = {
    company   = "DataPulse Partners"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0331" {
  name        = "Amelia Svoboda"
  email       = "amelia.svoboda@nexgen.com"
  phone       = "+358276747836"
  description = "NexGen Group — Frontend Lead, design system migration"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Level 4"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Amelia Svoboda"
    phone = "+358276747836"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Level 4"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0331"

  metadata = {
    company   = "NexGen Group"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0332" {
  name        = "Pedro Patel"
  email       = "pedro.patel@quantumbit.ai"
  phone       = "+64580185694"
  description = "QuantumBit Ventures — Lead Developer, technical evaluation"

  address {
    line1       = "1 Willis Street"
    line2       = "Level 14"
    city        = "Wellington"
    state       = "Wellington"
    postal_code = "6011"
    country     = "NZ"
  }

  shipping {
    name  = "Pedro Patel"
    phone = "+64580185694"
    address {
      line1       = "1 Willis Street"
      line2       = "Level 14"
      city        = "Wellington"
      state       = "Wellington"
      postal_code = "6011"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0332"

  metadata = {
    company   = "QuantumBit Ventures"
    plan      = "business"
    sales_rep = "rtan"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0333" {
  name        = "Finn Vargas"
  email       = "finn.vargas@bloom.org"
  phone       = "+56385258001"
  description = "Bloom Systems — Enterprise client, onboarded Q3 2025"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Building B"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Finn Vargas"
    phone = "+56385258001"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Building B"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0333"

  metadata = {
    company   = "Bloom Systems"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0334" {
  name        = "Linnea Carter"
  email       = "linnea.carter@vertex.com"
  phone       = "+910910939111"
  description = "Vertex S.r.l. — Security Lead, zero-trust implementation"

  address {
    line1       = "Nariman Point"
    line2       = "Floor 15"
    city        = "Mumbai"
    state       = "Maharashtra"
    postal_code = "400001"
    country     = "IN"
  }

  shipping {
    name  = "Linnea Carter"
    phone = "+910910939111"
    address {
      line1       = "Nariman Point"
      line2       = "Floor 15"
      city        = "Mumbai"
      state       = "Maharashtra"
      postal_code = "400001"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0334"

  metadata = {
    company   = "Vertex S.r.l."
    plan      = "enterprise"
    sales_rep = "nkumar"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0335" {
  name        = "Levi Carvalho"
  email       = "levi.carvalho@datapulse.io"
  phone       = "+6574654214"
  description = "DataPulse AB — Backend Engineer, API integration project"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Suite 400"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Levi Carvalho"
    phone = "+6574654214"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Suite 400"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0335"

  metadata = {
    company   = "DataPulse AB"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0336" {
  name        = "Jean Reyes"
  email       = "jean.reyes@cloudnova.co"
  phone       = "+4996271286391"
  description = "CloudNova Oy — Solutions Architect, custom deployment"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Suite 500"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Jean Reyes"
    phone = "+4996271286391"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Suite 500"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0336"

  metadata = {
    company   = "CloudNova Oy"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0337" {
  name        = "Axel Osei"
  email       = "axel.osei@mindforge.cloud"
  phone       = "+392006425690"
  description = "MindForge Group — Growth Lead, high-velocity team"

  address {
    line1       = "Via Monte Napoleone 8"
    line2       = "Suite 500"
    city        = "Milano"
    state       = "MI"
    postal_code = "20121"
    country     = "IT"
  }

  shipping {
    name  = "Axel Osei"
    phone = "+392006425690"
    address {
      line1       = "Via Monte Napoleone 8"
      line2       = "Suite 500"
      city        = "Milano"
      state       = "MI"
      postal_code = "20121"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0337"

  metadata = {
    company   = "MindForge Group"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0338" {
  name        = "Kwesi Roberts"
  email       = "kwesi.roberts@heliosphere.io"
  phone       = "+579855460158"
  description = "Heliosphere S.L. — Lead Developer, technical evaluation"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Floor 15"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Kwesi Roberts"
    phone = "+579855460158"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Floor 15"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0338"

  metadata = {
    company   = "Heliosphere S.L."
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0339" {
  name        = "Hala Weber"
  email       = "hala.weber@alloy.app"
  phone       = "+526157173203"
  description = "Alloy S.L. — Enterprise client, onboarded Q4 2024"

  address {
    line1       = "Paseo de la Reforma 250"
    line2       = "Level 6"
    city        = "Mexico City"
    state       = "CDMX"
    postal_code = "06600"
    country     = "MX"
  }

  shipping {
    name  = "Hala Weber"
    phone = "+526157173203"
    address {
      line1       = "Paseo de la Reforma 250"
      line2       = "Level 6"
      city        = "Mexico City"
      state       = "CDMX"
      postal_code = "06600"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0339"

  metadata = {
    company   = "Alloy S.L."
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0340" {
  name        = "Sofia Bhat"
  email       = "sofia.bhat@wavesync.com"
  phone       = "+64050506138"
  description = "WaveSync Consulting — Solutions Architect, custom deployment"

  address {
    line1       = "1 Willis Street"
    line2       = "Floor 10"
    city        = "Wellington"
    state       = "Wellington"
    postal_code = "6011"
    country     = "NZ"
  }

  shipping {
    name  = "Sofia Bhat"
    phone = "+64050506138"
    address {
      line1       = "1 Willis Street"
      line2       = "Floor 10"
      city        = "Wellington"
      state       = "Wellington"
      postal_code = "6011"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0340"

  metadata = {
    company   = "WaveSync Consulting"
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0341" {
  name        = "Akash Pokorny"
  email       = "akash.pokorny@nordiqflow.co"
  phone       = "+432020417929"
  description = "NordiqFlow A/S — Product lead, migrated from competitor"

  address {
    line1       = "Graben 21"
    line2       = "Unit B"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Akash Pokorny"
    phone = "+432020417929"
    address {
      line1       = "Graben 21"
      line2       = "Unit B"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0341"

  metadata = {
    company   = "NordiqFlow A/S"
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0342" {
  name        = "Jackson Baker"
  email       = "jackson.baker@ionpath.tech"
  phone       = "+64198253092"
  description = "IonPath Co. — Lead Developer, technical evaluation"

  address {
    line1       = "1 Willis Street"
    line2       = "Apt 6E"
    city        = "Wellington"
    state       = "Wellington"
    postal_code = "6011"
    country     = "NZ"
  }

  shipping {
    name  = "Jackson Baker"
    phone = "+64198253092"
    address {
      line1       = "1 Willis Street"
      line2       = "Apt 6E"
      city        = "Wellington"
      state       = "Wellington"
      postal_code = "6011"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0342"

  metadata = {
    company   = "IonPath Co."
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0343" {
  name        = "Ezra Carvalho"
  email       = "ezra.carvalho@betaforge.co"
  phone       = "+61902196207"
  description = "BetaForge SAS — Product lead, migrated from competitor"

  address {
    line1       = "120 Collins Street"
    line2       = "Level 14"
    city        = "Melbourne"
    state       = "VIC"
    postal_code = "3000"
    country     = "AU"
  }

  shipping {
    name  = "Ezra Carvalho"
    phone = "+61902196207"
    address {
      line1       = "120 Collins Street"
      line2       = "Level 14"
      city        = "Melbourne"
      state       = "VIC"
      postal_code = "3000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0343"

  metadata = {
    company   = "BetaForge SAS"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0344" {
  name        = "Heidi Bonnet"
  email       = "heidi.bonnet@relay.dev"
  phone       = "+64324876329"
  description = "Relay Partners — VP of Sales, CRM integration"

  address {
    line1       = "1 Willis Street"
    line2       = "Floor 2"
    city        = "Wellington"
    state       = "Wellington"
    postal_code = "6011"
    country     = "NZ"
  }

  shipping {
    name  = "Heidi Bonnet"
    phone = "+64324876329"
    address {
      line1       = "1 Willis Street"
      line2       = "Floor 2"
      city        = "Wellington"
      state       = "Wellington"
      postal_code = "6011"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0344"

  metadata = {
    company   = "Relay Partners"
    plan      = "pro"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0345" {
  name        = "Pablo Shimizu"
  email       = "pablo.shimizu@helixdata.co"
  phone       = "+48181958837"
  description = "HelixData Inc. — Backend Engineer, API integration project"

  address {
    line1       = "ul. Marszalkowska 27"
    line2       = "Floor 5"
    city        = "Warsaw"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Pablo Shimizu"
    phone = "+48181958837"
    address {
      line1       = "ul. Marszalkowska 27"
      line2       = "Floor 5"
      city        = "Warsaw"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0345"

  metadata = {
    company   = "HelixData Inc."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0346" {
  name        = "Dylan Almeida"
  email       = "dylan.almeida@luminary.dev"
  phone       = "+353200543645"
  description = "Luminary Ventures — Security Lead, zero-trust implementation"

  address {
    line1       = "70 South Mall"
    line2       = "Level 6"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Dylan Almeida"
    phone = "+353200543645"
    address {
      line1       = "70 South Mall"
      line2       = "Level 6"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0346"

  metadata = {
    company   = "Luminary Ventures"
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0347" {
  name        = "Charles Allen"
  email       = "charles.allen@drift.io"
  phone       = "+353379956353"
  description = "Drift Inc. — Backend Engineer, API integration project"

  address {
    line1       = "32 Merrion Square"
    line2       = "Unit C"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Charles Allen"
    phone = "+353379956353"
    address {
      line1       = "32 Merrion Square"
      line2       = "Unit C"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0347"

  metadata = {
    company   = "Drift Inc."
    plan      = "business"
    sales_rep = "akim"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0348" {
  name        = "Giulia Baker"
  email       = "giulia.baker@coresync.cloud"
  phone       = "+5597062397265"
  description = "CoreSync Platform — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Av. Paulista 1578"
    line2       = "Office 101"
    city        = "Sao Paulo"
    state       = "SP"
    postal_code = "01310-200"
    country     = "BR"
  }

  shipping {
    name  = "Giulia Baker"
    phone = "+5597062397265"
    address {
      line1       = "Av. Paulista 1578"
      line2       = "Office 101"
      city        = "Sao Paulo"
      state       = "SP"
      postal_code = "01310-200"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0348"

  metadata = {
    company   = "CoreSync Platform"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0349" {
  name        = "Akiko Saito"
  email       = "akiko.saito@solarwindhq.app"
  phone       = "+572177625349"
  description = "SolarWind HQ LLC — VP of Product, expanding to new markets"

  address {
    line1       = "Carrera 7 No. 71-52"
    line2       = "Level 4"
    city        = "Bogota"
    state       = "Cundinamarca"
    postal_code = "110111"
    country     = "CO"
  }

  shipping {
    name  = "Akiko Saito"
    phone = "+572177625349"
    address {
      line1       = "Carrera 7 No. 71-52"
      line2       = "Level 4"
      city        = "Bogota"
      state       = "Cundinamarca"
      postal_code = "110111"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0349"

  metadata = {
    company   = "SolarWind HQ LLC"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0350" {
  name        = "Akash Mitchell"
  email       = "akash.mitchell@elevate.app"
  phone       = "+358063356939"
  description = "Elevate A/S — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Tower 1"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Akash Mitchell"
    phone = "+358063356939"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Tower 1"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0350"

  metadata = {
    company   = "Elevate A/S"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0351" {
  name        = "Suresh Tanaka"
  email       = "suresh.tanaka@ionpath.io"
  phone       = "+827731806325"
  description = "IonPath KG — Staff Engineer, enterprise consultant"

  address {
    line1       = "55 Jungang-daero, Jung-gu"
    line2       = "Office 303"
    city        = "Busan"
    state       = "Busan"
    postal_code = "48058"
    country     = "KR"
  }

  shipping {
    name  = "Suresh Tanaka"
    phone = "+827731806325"
    address {
      line1       = "55 Jungang-daero, Jung-gu"
      line2       = "Office 303"
      city        = "Busan"
      state       = "Busan"
      postal_code = "48058"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0351"

  metadata = {
    company   = "IonPath KG"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0352" {
  name        = "Joshua Okonkwo"
  email       = "joshua.okonkwo@mesontech.cloud"
  phone       = "+351726257016"
  description = "MesonTech Software — VP of Sales, CRM integration"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Office 101"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Joshua Okonkwo"
    phone = "+351726257016"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Office 101"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0352"

  metadata = {
    company   = "MesonTech Software"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0353" {
  name        = "Adwoa Lim"
  email       = "adwoa.lim@echo.org"
  phone       = "+64508501657"
  description = "Echo B.V. — Security Lead, zero-trust implementation"

  address {
    line1       = "23 Customs Street East"
    line2       = "Level 9"
    city        = "Auckland"
    state       = "Auckland"
    postal_code = "1010"
    country     = "NZ"
  }

  shipping {
    name  = "Adwoa Lim"
    phone = "+64508501657"
    address {
      line1       = "23 Customs Street East"
      line2       = "Level 9"
      city        = "Auckland"
      state       = "Auckland"
      postal_code = "1010"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0353"

  metadata = {
    company   = "Echo B.V."
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0354" {
  name        = "Sebastian Jung"
  email       = "sebastian.jung@traverse.tech"
  phone       = "+13817933554"
  description = "Traverse Group — Growth Lead, high-velocity team"

  address {
    line1       = "100 King Street West"
    line2       = "Apt 3B"
    city        = "Toronto"
    state       = "ON"
    postal_code = "M5H 2N2"
    country     = "CA"
  }

  shipping {
    name  = "Sebastian Jung"
    phone = "+13817933554"
    address {
      line1       = "100 King Street West"
      line2       = "Apt 3B"
      city        = "Toronto"
      state       = "ON"
      postal_code = "M5H 2N2"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0354"

  metadata = {
    company   = "Traverse Group"
    plan      = "business"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0355" {
  name        = "Magnus Ruiz"
  email       = "magnus.ruiz@quasarhq.cloud"
  phone       = "+4588479513"
  description = "QuasarHQ KG — Solutions Architect, custom deployment"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Office 202"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Magnus Ruiz"
    phone = "+4588479513"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Office 202"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0355"

  metadata = {
    company   = "QuasarHQ KG"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0356" {
  name        = "Scarlett Davis"
  email       = "scarlett.davis@brightpath.cloud"
  phone       = "+33238046827"
  description = "BrightPath AB — Data Science Lead, analytics use case"

  address {
    line1       = "45 Rue de la Republique"
    line2       = "Office 202"
    city        = "Lyon"
    postal_code = "69002"
    country     = "FR"
  }

  shipping {
    name  = "Scarlett Davis"
    phone = "+33238046827"
    address {
      line1       = "45 Rue de la Republique"
      line2       = "Office 202"
      city        = "Lyon"
      postal_code = "69002"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0356"

  metadata = {
    company   = "BrightPath AB"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0357" {
  name        = "Josiah Costa"
  email       = "josiah.costa@nordiqflow.net"
  phone       = "+64569557988"
  description = "NordiqFlow Software — Solutions Architect, custom deployment"

  address {
    line1       = "23 Customs Street East"
    line2       = "Office 303"
    city        = "Auckland"
    state       = "Auckland"
    postal_code = "1010"
    country     = "NZ"
  }

  shipping {
    name  = "Josiah Costa"
    phone = "+64569557988"
    address {
      line1       = "23 Customs Street East"
      line2       = "Office 303"
      city        = "Auckland"
      state       = "Auckland"
      postal_code = "1010"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0357"

  metadata = {
    company   = "NordiqFlow Software"
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0358" {
  name        = "Audrey Collins"
  email       = "audrey.collins@jetstream.com"
  phone       = "+46254729284"
  description = "JetStream A/S — VP of Product, expanding to new markets"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Floor 5"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Audrey Collins"
    phone = "+46254729284"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Floor 5"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0358"

  metadata = {
    company   = "JetStream A/S"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0359" {
  name        = "Ava Watanabe"
  email       = "ava.watanabe@catalyze.tech"
  phone       = "+392380552578"
  description = "Catalyze GmbH — VP of Product, expanding to new markets"

  address {
    line1       = "Via del Corso 300"
    line2       = "Tower 2"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Ava Watanabe"
    phone = "+392380552578"
    address {
      line1       = "Via del Corso 300"
      line2       = "Tower 2"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0359"

  metadata = {
    company   = "Catalyze GmbH"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0360" {
  name        = "Anthony Hernandez"
  email       = "anthony.hernandez@vivid.net"
  phone       = "+818547492975"
  description = "Vivid Co. — VP of Sales, CRM integration"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Level 9"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Anthony Hernandez"
    phone = "+818547492975"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Level 9"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0360"

  metadata = {
    company   = "Vivid Co."
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0361" {
  name        = "Eleanor Bailey"
  email       = "eleanor.bailey@cascadehq.cloud"
  phone       = "+971515093983"
  description = "Cascade HQ S.L. — Backend Engineer, API integration project"

  address {
    line1       = "Dubai Internet City, Building 1"
    line2       = "Level 6"
    city        = "Dubai"
    postal_code = "500001"
    country     = "AE"
  }

  shipping {
    name  = "Eleanor Bailey"
    phone = "+971515093983"
    address {
      line1       = "Dubai Internet City, Building 1"
      line2       = "Level 6"
      city        = "Dubai"
      postal_code = "500001"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0361"

  metadata = {
    company   = "Cascade HQ S.L."
    plan      = "pro"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0362" {
  name        = "Felipe Souza"
  email       = "felipe.souza@outlook.co"
  phone       = "+4575998056"
  description = "Outlook Ltd. — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Store Torv 4"
    line2       = "Suite 100"
    city        = "Aarhus"
    postal_code = "8000"
    country     = "DK"
  }

  shipping {
    name  = "Felipe Souza"
    phone = "+4575998056"
    address {
      line1       = "Store Torv 4"
      line2       = "Suite 100"
      city        = "Aarhus"
      postal_code = "8000"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0362"

  metadata = {
    company   = "Outlook Ltd."
    plan      = "business"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0363" {
  name        = "Heidi Kato"
  email       = "heidi.kato@yieldmax.co"
  phone       = "+397674266299"
  description = "YieldMax S.r.l. — Product lead, migrated from competitor"

  address {
    line1       = "Via Monte Napoleone 8"
    line2       = "Level 4"
    city        = "Milano"
    state       = "MI"
    postal_code = "20121"
    country     = "IT"
  }

  shipping {
    name  = "Heidi Kato"
    phone = "+397674266299"
    address {
      line1       = "Via Monte Napoleone 8"
      line2       = "Level 4"
      city        = "Milano"
      state       = "MI"
      postal_code = "20121"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0363"

  metadata = {
    company   = "YieldMax S.r.l."
    plan      = "pro"
    sales_rep = "twright"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0364" {
  name        = "Astrid Costa"
  email       = "astrid.costa@wander.io"
  phone       = "+886064628792"
  description = "Wander Sp. z o.o. — Operations Director, multi-year deal"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Tower 2"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Astrid Costa"
    phone = "+886064628792"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Tower 2"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0364"

  metadata = {
    company   = "Wander Sp. z o.o."
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0365" {
  name        = "Ava Reed"
  email       = "ava.reed@jubilee.net"
  phone       = "+6573002447"
  description = "Jubilee Sp. z o.o. — Head of Engineering, annual contract"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Unit C"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Ava Reed"
    phone = "+6573002447"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Unit C"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0365"

  metadata = {
    company   = "Jubilee Sp. z o.o."
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0366" {
  name        = "Lucas Moore"
  email       = "lucas.moore@aeris.org"
  phone       = "+353597964715"
  description = "Aeris AB — Growth Lead, high-velocity team"

  address {
    line1       = "32 Merrion Square"
    line2       = "Suite 400"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Lucas Moore"
    phone = "+353597964715"
    address {
      line1       = "32 Merrion Square"
      line2       = "Suite 400"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0366"

  metadata = {
    company   = "Aeris AB"
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0367" {
  name        = "Anthony Watanabe"
  email       = "anthony.watanabe@neutronops.tech"
  phone       = "+572045650448"
  description = "NeutronOps Platform — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Carrera 7 No. 71-52"
    line2       = "Floor 3"
    city        = "Bogota"
    state       = "Cundinamarca"
    postal_code = "110111"
    country     = "CO"
  }

  shipping {
    name  = "Anthony Watanabe"
    phone = "+572045650448"
    address {
      line1       = "Carrera 7 No. 71-52"
      line2       = "Floor 3"
      city        = "Bogota"
      state       = "Cundinamarca"
      postal_code = "110111"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0367"

  metadata = {
    company   = "NeutronOps Platform"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0368" {
  name        = "Savannah Sun"
  email       = "savannah.sun@velocloud.app"
  phone       = "+31518952028"
  description = "VeloCloud Software — Staff Engineer, enterprise consultant"

  address {
    line1       = "Coolsingel 40"
    line2       = "Floor 12"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Savannah Sun"
    phone = "+31518952028"
    address {
      line1       = "Coolsingel 40"
      line2       = "Floor 12"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0368"

  metadata = {
    company   = "VeloCloud Software"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0369" {
  name        = "Jaxon Mitchell"
  email       = "jaxon.mitchell@jadepathventures.net"
  phone       = "+5598881671120"
  description = "JadePath Ventures KG — Director of IT, compliance focused"

  address {
    line1       = "Av. Paulista 1578"
    line2       = "Floor 8"
    city        = "Sao Paulo"
    state       = "SP"
    postal_code = "01310-200"
    country     = "BR"
  }

  shipping {
    name  = "Jaxon Mitchell"
    phone = "+5598881671120"
    address {
      line1       = "Av. Paulista 1578"
      line2       = "Floor 8"
      city        = "Sao Paulo"
      state       = "SP"
      postal_code = "01310-200"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0369"

  metadata = {
    company   = "JadePath Ventures KG"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0370" {
  name        = "Henrique Eriksson"
  email       = "henrique.eriksson@unitystack.app"
  phone       = "+31013223423"
  description = "UnityStack Group — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Dam 1"
    line2       = "Suite 500"
    city        = "Amsterdam"
    state       = "North Holland"
    postal_code = "1012 JS"
    country     = "NL"
  }

  shipping {
    name  = "Henrique Eriksson"
    phone = "+31013223423"
    address {
      line1       = "Dam 1"
      line2       = "Suite 500"
      city        = "Amsterdam"
      state       = "North Holland"
      postal_code = "1012 JS"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0370"

  metadata = {
    company   = "UnityStack Group"
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0371" {
  name        = "Priya Novikov"
  email       = "priya.novikov@pulsenet.co"
  phone       = "+34108907140"
  description = "PulseNet Group — Product lead, migrated from competitor"

  address {
    line1       = "Paseo de la Castellana 89"
    line2       = "Unit A"
    city        = "Madrid"
    state       = "Madrid"
    postal_code = "28014"
    country     = "ES"
  }

  shipping {
    name  = "Priya Novikov"
    phone = "+34108907140"
    address {
      line1       = "Paseo de la Castellana 89"
      line2       = "Unit A"
      city        = "Madrid"
      state       = "Madrid"
      postal_code = "28014"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0371"

  metadata = {
    company   = "PulseNet Group"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0372" {
  name        = "Hiroshi Flores"
  email       = "hiroshi.flores@outlook.dev"
  phone       = "+14955289389"
  description = "Outlook AG — Product lead, migrated from competitor"

  address {
    line1       = "350 Fifth Avenue"
    line2       = "Floor 20"
    city        = "New York"
    state       = "NY"
    postal_code = "10001"
    country     = "US"
  }

  shipping {
    name  = "Hiroshi Flores"
    phone = "+14955289389"
    address {
      line1       = "350 Fifth Avenue"
      line2       = "Floor 20"
      city        = "New York"
      state       = "NY"
      postal_code = "10001"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0372"

  metadata = {
    company   = "Outlook AG"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0373" {
  name        = "Fritz Scott"
  email       = "fritz.scott@sable.io"
  phone       = "+48387592712"
  description = "Sable Group — Data Science Lead, analytics use case"

  address {
    line1       = "ul. Marszalkowska 27"
    line2       = "Unit B"
    city        = "Warsaw"
    state       = "Mazowieckie"
    postal_code = "00-639"
    country     = "PL"
  }

  shipping {
    name  = "Fritz Scott"
    phone = "+48387592712"
    address {
      line1       = "ul. Marszalkowska 27"
      line2       = "Unit B"
      city        = "Warsaw"
      state       = "Mazowieckie"
      postal_code = "00-639"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0373"

  metadata = {
    company   = "Sable Group"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0374" {
  name        = "Liam Rodriguez"
  email       = "liam.rodriguez@aeris.io"
  phone       = "+33827548015"
  description = "Aeris Co. — Director of IT, compliance focused"

  address {
    line1       = "1 Place du Capitole"
    line2       = "Office 303"
    city        = "Toulouse"
    postal_code = "31000"
    country     = "FR"
  }

  shipping {
    name  = "Liam Rodriguez"
    phone = "+33827548015"
    address {
      line1       = "1 Place du Capitole"
      line2       = "Office 303"
      city        = "Toulouse"
      postal_code = "31000"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0374"

  metadata = {
    company   = "Aeris Co."
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0375" {
  name        = "Julia Roberts"
  email       = "julia.roberts@zephyrcloud.co"
  phone       = "+6517520716"
  description = "ZephyrCloud ApS — Solutions Architect, custom deployment"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Apt 5D"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Julia Roberts"
    phone = "+6517520716"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Apt 5D"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0375"

  metadata = {
    company   = "ZephyrCloud ApS"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0376" {
  name        = "Jaxon Adjei"
  email       = "jaxon.adjei@vivid.tech"
  phone       = "+61353961367"
  description = "Vivid Platform — Managing Director, long-term partnership"

  address {
    line1       = "1 Macquarie Place"
    line2       = "Apt 5D"
    city        = "Sydney"
    state       = "NSW"
    postal_code = "2000"
    country     = "AU"
  }

  shipping {
    name  = "Jaxon Adjei"
    phone = "+61353961367"
    address {
      line1       = "1 Macquarie Place"
      line2       = "Apt 5D"
      city        = "Sydney"
      state       = "NSW"
      postal_code = "2000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0376"

  metadata = {
    company   = "Vivid Platform"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0377" {
  name        = "Zhou Wang"
  email       = "zhou.wang@prismtech.io"
  phone       = "+886147732010"
  description = "PrismTech GmbH — Product lead, migrated from competitor"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Office 404"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Zhou Wang"
    phone = "+886147732010"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Office 404"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0377"

  metadata = {
    company   = "PrismTech GmbH"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0378" {
  name        = "Jace Reed"
  email       = "jace.reed@ignite.net"
  phone       = "+33773477848"
  description = "Ignite Technologies — Lead Developer, technical evaluation"

  address {
    line1       = "12 Avenue des Champs-Elysees"
    line2       = "Apt 4C"
    city        = "Paris"
    postal_code = "75008"
    country     = "FR"
  }

  shipping {
    name  = "Jace Reed"
    phone = "+33773477848"
    address {
      line1       = "12 Avenue des Champs-Elysees"
      line2       = "Apt 4C"
      city        = "Paris"
      postal_code = "75008"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0378"

  metadata = {
    company   = "Ignite Technologies"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0379" {
  name        = "Kenji Yamamoto"
  email       = "kenji.yamamoto@mosaic.com"
  phone       = "+390284276246"
  description = "Mosaic S.L. — Director of IT, compliance focused"

  address {
    line1       = "Via del Corso 300"
    line2       = "Level 6"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Kenji Yamamoto"
    phone = "+390284276246"
    address {
      line1       = "Via del Corso 300"
      line2       = "Level 6"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0379"

  metadata = {
    company   = "Mosaic S.L."
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0380" {
  name        = "Axel Kumar"
  email       = "axel.kumar@omicronai.net"
  phone       = "+4706479695"
  description = "OmicronAI SAS — Backend Engineer, API integration project"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Level 14"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Axel Kumar"
    phone = "+4706479695"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Level 14"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0380"

  metadata = {
    company   = "OmicronAI SAS"
    plan      = "business"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0381" {
  name        = "Mia Anderson"
  email       = "mia.anderson@kinesis.tech"
  phone       = "+46616556503"
  description = "Kinesis AG — Co-founder, Series A funded"

  address {
    line1       = "Kungsgatan 44"
    line2       = "Suite 500"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Mia Anderson"
    phone = "+46616556503"
    address {
      line1       = "Kungsgatan 44"
      line2       = "Suite 500"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0381"

  metadata = {
    company   = "Kinesis AG"
    plan      = "business"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0382" {
  name        = "Miguel Wilson"
  email       = "miguel.wilson@xenonlabs.tech"
  phone       = "+10769864079"
  description = "XenonLabs S.A. — Enterprise client, onboarded Q2 2025"

  address {
    line1       = "121 SW Morrison Street"
    line2       = "Office 404"
    city        = "Portland"
    state       = "OR"
    postal_code = "97204"
    country     = "US"
  }

  shipping {
    name  = "Miguel Wilson"
    phone = "+10769864079"
    address {
      line1       = "121 SW Morrison Street"
      line2       = "Office 404"
      city        = "Portland"
      state       = "OR"
      postal_code = "97204"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0382"

  metadata = {
    company   = "XenonLabs S.A."
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0383" {
  name        = "Maja Garcia"
  email       = "maja.garcia@gradient.tech"
  phone       = "+33785294563"
  description = "Gradient A/S — Director of IT, compliance focused"

  address {
    line1       = "45 Rue de la Republique"
    line2       = "Suite 400"
    city        = "Lyon"
    postal_code = "69002"
    country     = "FR"
  }

  shipping {
    name  = "Maja Garcia"
    phone = "+33785294563"
    address {
      line1       = "45 Rue de la Republique"
      line2       = "Suite 400"
      city        = "Lyon"
      postal_code = "69002"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0383"

  metadata = {
    company   = "Gradient A/S"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0384" {
  name        = "Diego Jang"
  email       = "diego.jang@fusiongrid.io"
  phone       = "+5591954198763"
  description = "FusionGrid Partners — Data Science Lead, analytics use case"

  address {
    line1       = "Av. Afonso Pena 1500"
    line2       = "Building A"
    city        = "Belo Horizonte"
    state       = "MG"
    postal_code = "30130-003"
    country     = "BR"
  }

  shipping {
    name  = "Diego Jang"
    phone = "+5591954198763"
    address {
      line1       = "Av. Afonso Pena 1500"
      line2       = "Building A"
      city        = "Belo Horizonte"
      state       = "MG"
      postal_code = "30130-003"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0384"

  metadata = {
    company   = "FusionGrid Partners"
    plan      = "business"
    sales_rep = "rtan"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0385" {
  name        = "Kwesi Yamamoto"
  email       = "kwesi.yamamoto@fluxwave.org"
  phone       = "+828782082973"
  description = "FluxWave ApS — Frontend Lead, design system migration"

  address {
    line1       = "55 Jungang-daero, Jung-gu"
    line2       = "Building A"
    city        = "Busan"
    state       = "Busan"
    postal_code = "48058"
    country     = "KR"
  }

  shipping {
    name  = "Kwesi Yamamoto"
    phone = "+828782082973"
    address {
      line1       = "55 Jungang-daero, Jung-gu"
      line2       = "Building A"
      city        = "Busan"
      state       = "Busan"
      postal_code = "48058"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0385"

  metadata = {
    company   = "FluxWave ApS"
    plan      = "business"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0386" {
  name        = "Lina Osei"
  email       = "lina.osei@jetpack.tech"
  phone       = "+4572324665"
  description = "Jetpack LLC — Product lead, migrated from competitor"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Floor 12"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Lina Osei"
    phone = "+4572324665"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Floor 12"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0386"

  metadata = {
    company   = "Jetpack LLC"
    plan      = "enterprise"
    sales_rep = "rtan"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0387" {
  name        = "Marie Almeida"
  email       = "marie.almeida@foundry.io"
  phone       = "+822303477866"
  description = "Foundry Pty Ltd — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Floor 8"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Marie Almeida"
    phone = "+822303477866"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Floor 8"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0387"

  metadata = {
    company   = "Foundry Pty Ltd"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0388" {
  name        = "Lucas Collins"
  email       = "lucas.collins@echo.com"
  phone       = "+917001594165"
  description = "Echo Partners — Frontend Lead, design system migration"

  address {
    line1       = "Nariman Point"
    line2       = "Unit C"
    city        = "Mumbai"
    state       = "Maharashtra"
    postal_code = "400001"
    country     = "IN"
  }

  shipping {
    name  = "Lucas Collins"
    phone = "+917001594165"
    address {
      line1       = "Nariman Point"
      line2       = "Unit C"
      city        = "Mumbai"
      state       = "Maharashtra"
      postal_code = "400001"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0388"

  metadata = {
    company   = "Echo Partners"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0389" {
  name        = "Lily Jang"
  email       = "lily.jang@xpanse.net"
  phone       = "+439847139155"
  description = "Xpanse KG — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Graben 21"
    line2       = "Floor 10"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Lily Jang"
    phone = "+439847139155"
    address {
      line1       = "Graben 21"
      line2       = "Floor 10"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0389"

  metadata = {
    company   = "Xpanse KG"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0390" {
  name        = "Grayson Torres"
  email       = "grayson.torres@hyperloop.app"
  phone       = "+399078515867"
  description = "HyperLoop AB — Frontend Lead, design system migration"

  address {
    line1       = "Via del Corso 300"
    line2       = "Tower 1"
    city        = "Roma"
    state       = "RM"
    postal_code = "00187"
    country     = "IT"
  }

  shipping {
    name  = "Grayson Torres"
    phone = "+399078515867"
    address {
      line1       = "Via del Corso 300"
      line2       = "Tower 1"
      city        = "Roma"
      state       = "RM"
      postal_code = "00187"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0390"

  metadata = {
    company   = "HyperLoop AB"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0391" {
  name        = "Marek Bailey"
  email       = "marek.bailey@nordiqflow.com"
  phone       = "+41348645183"
  description = "NordiqFlow Solutions — Solutions Architect, custom deployment"

  address {
    line1       = "Bahnhofstrasse 10"
    line2       = "Office 303"
    city        = "Zurich"
    state       = "ZH"
    postal_code = "8001"
    country     = "CH"
  }

  shipping {
    name  = "Marek Bailey"
    phone = "+41348645183"
    address {
      line1       = "Bahnhofstrasse 10"
      line2       = "Office 303"
      city        = "Zurich"
      state       = "ZH"
      postal_code = "8001"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0391"

  metadata = {
    company   = "NordiqFlow Solutions"
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0392" {
  name        = "Nathan Lebedev"
  email       = "nathan.lebedev@kineticai.cloud"
  phone       = "+15604177656"
  description = "KineticAI S.r.l. — Head of Engineering, annual contract"

  address {
    line1       = "100 King Street West"
    line2       = "Apt 2A"
    city        = "Toronto"
    state       = "ON"
    postal_code = "M5H 2N2"
    country     = "CA"
  }

  shipping {
    name  = "Nathan Lebedev"
    phone = "+15604177656"
    address {
      line1       = "100 King Street West"
      line2       = "Apt 2A"
      city        = "Toronto"
      state       = "ON"
      postal_code = "M5H 2N2"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0392"

  metadata = {
    company   = "KineticAI S.r.l."
    plan      = "business"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0393" {
  name        = "Chiara Nilsson"
  email       = "chiara.nilsson@wavelength.cloud"
  phone       = "+48002720634"
  description = "Wavelength Consulting — Lead Developer, technical evaluation"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Level 4"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Chiara Nilsson"
    phone = "+48002720634"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Level 4"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0393"

  metadata = {
    company   = "Wavelength Consulting"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0394" {
  name        = "Carter Eriksson"
  email       = "carter.eriksson@quantum.cloud"
  phone       = "+64724295431"
  description = "Quantum ApS — Head of Payments, fintech integration"

  address {
    line1       = "1 Willis Street"
    line2       = "Level 11"
    city        = "Wellington"
    state       = "Wellington"
    postal_code = "6011"
    country     = "NZ"
  }

  shipping {
    name  = "Carter Eriksson"
    phone = "+64724295431"
    address {
      line1       = "1 Willis Street"
      line2       = "Level 11"
      city        = "Wellington"
      state       = "Wellington"
      postal_code = "6011"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0394"

  metadata = {
    company   = "Quantum ApS"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0395" {
  name        = "Arjun Sullivan"
  email       = "arjun.sullivan@yonder.io"
  phone       = "+437342069694"
  description = "Yonder Inc. — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Graben 21"
    line2       = "Floor 5"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Arjun Sullivan"
    phone = "+437342069694"
    address {
      line1       = "Graben 21"
      line2       = "Floor 5"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0395"

  metadata = {
    company   = "Yonder Inc."
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0396" {
  name        = "Carlos Owusu"
  email       = "carlos.owusu@voltalabs.cloud"
  phone       = "+886133344762"
  description = "VoltaLabs ApS — Head of Payments, fintech integration"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Apt 6E"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Carlos Owusu"
    phone = "+886133344762"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Apt 6E"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0396"

  metadata = {
    company   = "VoltaLabs ApS"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0397" {
  name        = "Christian Fournier"
  email       = "christian.fournier@echo.app"
  phone       = "+13973597107"
  description = "Echo GmbH — CTO, SaaS company scaling rapidly"

  address {
    line1       = "233 S Wacker Drive"
    line2       = "Apt 4C"
    city        = "Chicago"
    state       = "IL"
    postal_code = "60601"
    country     = "US"
  }

  shipping {
    name  = "Christian Fournier"
    phone = "+13973597107"
    address {
      line1       = "233 S Wacker Drive"
      line2       = "Apt 4C"
      city        = "Chicago"
      state       = "IL"
      postal_code = "60601"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0397"

  metadata = {
    company   = "Echo GmbH"
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0398" {
  name        = "Marco Frimpong"
  email       = "marco.frimpong@foundry.net"
  phone       = "+4900537599004"
  description = "Foundry AB — Growth Lead, high-velocity team"

  address {
    line1       = "Friedrichstraße 68"
    line2       = "Floor 8"
    city        = "Berlin"
    state       = "Berlin"
    postal_code = "10117"
    country     = "DE"
  }

  shipping {
    name  = "Marco Frimpong"
    phone = "+4900537599004"
    address {
      line1       = "Friedrichstraße 68"
      line2       = "Floor 8"
      city        = "Berlin"
      state       = "Berlin"
      postal_code = "10117"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0398"

  metadata = {
    company   = "Foundry AB"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0399" {
  name        = "Samir Weber"
  email       = "samir.weber@daybreak.net"
  phone       = "+917572158624"
  description = "Daybreak S.A. — Head of Engineering, annual contract"

  address {
    line1       = "Nariman Point"
    line2       = "Office 101"
    city        = "Mumbai"
    state       = "Maharashtra"
    postal_code = "400001"
    country     = "IN"
  }

  shipping {
    name  = "Samir Weber"
    phone = "+917572158624"
    address {
      line1       = "Nariman Point"
      line2       = "Office 101"
      city        = "Mumbai"
      state       = "Maharashtra"
      postal_code = "400001"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0399"

  metadata = {
    company   = "Daybreak S.A."
    plan      = "starter"
    sales_rep = "twright"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0400" {
  name        = "Jakub Fernandez"
  email       = "jakub.fernandez@quantumbit.org"
  phone       = "+41485625728"
  description = "QuantumBit Platform — Frontend Lead, design system migration"

  address {
    line1       = "Rue du Rhone 50"
    line2       = "Suite 400"
    city        = "Geneva"
    state       = "GE"
    postal_code = "1201"
    country     = "CH"
  }

  shipping {
    name  = "Jakub Fernandez"
    phone = "+41485625728"
    address {
      line1       = "Rue du Rhone 50"
      line2       = "Suite 400"
      city        = "Geneva"
      state       = "GE"
      postal_code = "1201"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0400"

  metadata = {
    company   = "QuantumBit Platform"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0401" {
  name        = "Kavita Hill"
  email       = "kavita.hill@luminarestudio.cloud"
  phone       = "+916170758777"
  description = "Luminare Studio A/S — Head of Engineering, annual contract"

  address {
    line1       = "Nariman Point"
    line2       = "Unit A"
    city        = "Mumbai"
    state       = "Maharashtra"
    postal_code = "400001"
    country     = "IN"
  }

  shipping {
    name  = "Kavita Hill"
    phone = "+916170758777"
    address {
      line1       = "Nariman Point"
      line2       = "Unit A"
      city        = "Mumbai"
      state       = "Maharashtra"
      postal_code = "400001"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0401"

  metadata = {
    company   = "Luminare Studio A/S"
    plan      = "starter"
    sales_rep = "akim"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0402" {
  name        = "Heidi Hill"
  email       = "heidi.hill@jubilee.org"
  phone       = "+56939089261"
  description = "Jubilee S.A. — Co-founder, Series A funded"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Office 202"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Heidi Hill"
    phone = "+56939089261"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Office 202"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0402"

  metadata = {
    company   = "Jubilee S.A."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0403" {
  name        = "Wyatt Moreau"
  email       = "wyatt.moreau@betaforge.tech"
  phone       = "+432017774905"
  description = "BetaForge Sp. z o.o. — Startup founder, early adopter program"

  address {
    line1       = "Graben 21"
    line2       = "Floor 8"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Wyatt Moreau"
    phone = "+432017774905"
    address {
      line1       = "Graben 21"
      line2       = "Floor 8"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0403"

  metadata = {
    company   = "BetaForge Sp. z o.o."
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0404" {
  name        = "Haruto Kim"
  email       = "haruto.kim@fathom.com"
  phone       = "+6518961642"
  description = "Fathom Solutions — Co-founder, Series A funded"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Floor 12"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Haruto Kim"
    phone = "+6518961642"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Floor 12"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0404"

  metadata = {
    company   = "Fathom Solutions"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0405" {
  name        = "Mikhail Orlov"
  email       = "mikhail.orlov@fusiongrid.io"
  phone       = "+972476492515"
  description = "FusionGrid S.r.l. — Growth Lead, high-velocity team"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Tower 1"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Mikhail Orlov"
    phone = "+972476492515"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Tower 1"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0405"

  metadata = {
    company   = "FusionGrid S.r.l."
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0406" {
  name        = "Manon Kang"
  email       = "manon.kang@foundry.tech"
  phone       = "+4992661085732"
  description = "Foundry ApS — Director of IT, compliance focused"

  address {
    line1       = "Neue Mainzer Straße 52"
    line2       = "Floor 2"
    city        = "Frankfurt"
    state       = "Hessen"
    postal_code = "60311"
    country     = "DE"
  }

  shipping {
    name  = "Manon Kang"
    phone = "+4992661085732"
    address {
      line1       = "Neue Mainzer Straße 52"
      line2       = "Floor 2"
      city        = "Frankfurt"
      state       = "Hessen"
      postal_code = "60311"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0406"

  metadata = {
    company   = "Foundry ApS"
    plan      = "business"
    sales_rep = "msilva"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0407" {
  name        = "Liu Cooper"
  email       = "liu.cooper@jadepathventures.co"
  phone       = "+528649081081"
  description = "JadePath Ventures GmbH — Growth Lead, high-velocity team"

  address {
    line1       = "Av. Vallarta 2440"
    line2       = "Level 11"
    city        = "Guadalajara"
    state       = "Jalisco"
    postal_code = "44100"
    country     = "MX"
  }

  shipping {
    name  = "Liu Cooper"
    phone = "+528649081081"
    address {
      line1       = "Av. Vallarta 2440"
      line2       = "Level 11"
      city        = "Guadalajara"
      state       = "Jalisco"
      postal_code = "44100"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0407"

  metadata = {
    company   = "JadePath Ventures GmbH"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0408" {
  name        = "Ying Muller"
  email       = "ying.muller@mindforge.io"
  phone       = "+4972260164597"
  description = "MindForge Sp. z o.o. — Backend Engineer, API integration project"

  address {
    line1       = "Friedrichstraße 68"
    line2       = "Unit A"
    city        = "Berlin"
    state       = "Berlin"
    postal_code = "10117"
    country     = "DE"
  }

  shipping {
    name  = "Ying Muller"
    phone = "+4972260164597"
    address {
      line1       = "Friedrichstraße 68"
      line2       = "Unit A"
      city        = "Berlin"
      state       = "Berlin"
      postal_code = "10117"
      country     = "DE"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0408"

  metadata = {
    company   = "MindForge Sp. z o.o."
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0409" {
  name        = "Maverick Smith"
  email       = "maverick.smith@yellowbrick.ai"
  phone       = "+918006102776"
  description = "Yellowbrick Technologies — Frontend Lead, design system migration"

  address {
    line1       = "Embassy Tech Village"
    line2       = "Apt 3B"
    city        = "Bengaluru"
    state       = "Karnataka"
    postal_code = "560103"
    country     = "IN"
  }

  shipping {
    name  = "Maverick Smith"
    phone = "+918006102776"
    address {
      line1       = "Embassy Tech Village"
      line2       = "Apt 3B"
      city        = "Bengaluru"
      state       = "Karnataka"
      postal_code = "560103"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0409"

  metadata = {
    company   = "Yellowbrick Technologies"
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0410" {
  name        = "Declan Reed"
  email       = "declan.reed@terraflux.co"
  phone       = "+811030372368"
  description = "TerraFlux GmbH — Operations Director, multi-year deal"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Tower 1"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Declan Reed"
    phone = "+811030372368"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Tower 1"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0410"

  metadata = {
    company   = "TerraFlux GmbH"
    plan      = "business"
    sales_rep = "pdupont"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0411" {
  name        = "Marco Sullivan"
  email       = "marco.sullivan@wavecrestlabs.cloud"
  phone       = "+41770793349"
  description = "Wavecrest Labs S.A. — CEO, climate tech innovator"

  address {
    line1       = "Bahnhofstrasse 10"
    line2       = "Building A"
    city        = "Zurich"
    state       = "ZH"
    postal_code = "8001"
    country     = "CH"
  }

  shipping {
    name  = "Marco Sullivan"
    phone = "+41770793349"
    address {
      line1       = "Bahnhofstrasse 10"
      line2       = "Building A"
      city        = "Zurich"
      state       = "ZH"
      postal_code = "8001"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0411"

  metadata = {
    company   = "Wavecrest Labs S.A."
    plan      = "business"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0412" {
  name        = "Alessandro Chopra"
  email       = "alessandro.chopra@xpanse.com"
  phone       = "+971767899730"
  description = "Xpanse Sp. z o.o. — Growth Lead, high-velocity team"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Level 9"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Alessandro Chopra"
    phone = "+971767899730"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Level 9"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0412"

  metadata = {
    company   = "Xpanse Sp. z o.o."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0413" {
  name        = "Jackson Stewart"
  email       = "jackson.stewart@ripple.io"
  phone       = "+34795760243"
  description = "Ripple Solutions — Director of IT, compliance focused"

  address {
    line1       = "Passeig de Gracia 11"
    line2       = "Unit B"
    city        = "Barcelona"
    state       = "Catalonia"
    postal_code = "08002"
    country     = "ES"
  }

  shipping {
    name  = "Jackson Stewart"
    phone = "+34795760243"
    address {
      line1       = "Passeig de Gracia 11"
      line2       = "Unit B"
      city        = "Barcelona"
      state       = "Catalonia"
      postal_code = "08002"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0413"

  metadata = {
    company   = "Ripple Solutions"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0414" {
  name        = "Freya Nilsson"
  email       = "freya.nilsson@mosaic.dev"
  phone       = "+574665729341"
  description = "Mosaic Consulting — Frontend Lead, design system migration"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Floor 12"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Freya Nilsson"
    phone = "+574665729341"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Floor 12"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0414"

  metadata = {
    company   = "Mosaic Consulting"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0415" {
  name        = "Pooja Garcia"
  email       = "pooja.garcia@echo.co"
  phone       = "+353380054522"
  description = "Echo ApS — Growth Lead, high-velocity team"

  address {
    line1       = "70 South Mall"
    line2       = "Floor 5"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Pooja Garcia"
    phone = "+353380054522"
    address {
      line1       = "70 South Mall"
      line2       = "Floor 5"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0415"

  metadata = {
    company   = "Echo ApS"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0416" {
  name        = "Sanjay Moore"
  email       = "sanjay.moore@arclight.tech"
  phone       = "+353508428910"
  description = "ArcLight Pty Ltd — Solutions Architect, custom deployment"

  address {
    line1       = "70 South Mall"
    line2       = "Floor 3"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Sanjay Moore"
    phone = "+353508428910"
    address {
      line1       = "70 South Mall"
      line2       = "Floor 3"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0416"

  metadata = {
    company   = "ArcLight Pty Ltd"
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0417" {
  name        = "Rania Weber"
  email       = "rania.weber@stellarops.io"
  phone       = "+61352478712"
  description = "StellarOps Corp. — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "100 Eagle Street"
    line2       = "Floor 20"
    city        = "Brisbane"
    state       = "QLD"
    postal_code = "4000"
    country     = "AU"
  }

  shipping {
    name  = "Rania Weber"
    phone = "+61352478712"
    address {
      line1       = "100 Eagle Street"
      line2       = "Floor 20"
      city        = "Brisbane"
      state       = "QLD"
      postal_code = "4000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0417"

  metadata = {
    company   = "StellarOps Corp."
    plan      = "business"
    sales_rep = "akim"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0418" {
  name        = "Thiago Bonnet"
  email       = "thiago.bonnet@bloom.cloud"
  phone       = "+15482145653"
  description = "Bloom Group — CTO, SaaS company scaling rapidly"

  address {
    line1       = "1918 8th Avenue"
    line2       = "Apt 6E"
    city        = "Seattle"
    state       = "WA"
    postal_code = "98101"
    country     = "US"
  }

  shipping {
    name  = "Thiago Bonnet"
    phone = "+15482145653"
    address {
      line1       = "1918 8th Avenue"
      line2       = "Apt 6E"
      city        = "Seattle"
      state       = "WA"
      postal_code = "98101"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0418"

  metadata = {
    company   = "Bloom Group"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0419" {
  name        = "Aoife Hernandez"
  email       = "aoife.hernandez@yonder.com"
  phone       = "+4572081155"
  description = "Yonder Software — CEO, climate tech innovator"

  address {
    line1       = "Store Torv 4"
    line2       = "Suite 300"
    city        = "Aarhus"
    postal_code = "8000"
    country     = "DK"
  }

  shipping {
    name  = "Aoife Hernandez"
    phone = "+4572081155"
    address {
      line1       = "Store Torv 4"
      line2       = "Suite 300"
      city        = "Aarhus"
      postal_code = "8000"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0419"

  metadata = {
    company   = "Yonder Software"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0420" {
  name        = "Leah Lim"
  email       = "leah.lim@aurorasystems.ai"
  phone       = "+576845504892"
  description = "Aurora Systems Solutions — VP of Sales, CRM integration"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Level 6"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Leah Lim"
    phone = "+576845504892"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Level 6"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0420"

  metadata = {
    company   = "Aurora Systems Solutions"
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0421" {
  name        = "Henrique Carvalho"
  email       = "henrique.carvalho@yieldmax.co"
  phone       = "+64410856288"
  description = "YieldMax Platform — Staff Engineer, enterprise consultant"

  address {
    line1       = "1 Willis Street"
    line2       = "Office 303"
    city        = "Wellington"
    state       = "Wellington"
    postal_code = "6011"
    country     = "NZ"
  }

  shipping {
    name  = "Henrique Carvalho"
    phone = "+64410856288"
    address {
      line1       = "1 Willis Street"
      line2       = "Office 303"
      city        = "Wellington"
      state       = "Wellington"
      postal_code = "6011"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0421"

  metadata = {
    company   = "YieldMax Platform"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0422" {
  name        = "Darius Inoue"
  email       = "darius.inoue@zenith.com"
  phone       = "+61894346810"
  description = "Zenith Solutions — Data Science Lead, analytics use case"

  address {
    line1       = "1 Macquarie Place"
    line2       = "Floor 5"
    city        = "Sydney"
    state       = "NSW"
    postal_code = "2000"
    country     = "AU"
  }

  shipping {
    name  = "Darius Inoue"
    phone = "+61894346810"
    address {
      line1       = "1 Macquarie Place"
      line2       = "Floor 5"
      city        = "Sydney"
      state       = "NSW"
      postal_code = "2000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0422"

  metadata = {
    company   = "Zenith Solutions"
    plan      = "business"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0423" {
  name        = "Isabela Cooper"
  email       = "isabela.cooper@catalyze.tech"
  phone       = "+13998935449"
  description = "Catalyze Labs — Frontend Lead, design system migration"

  address {
    line1       = "701 Brickell Avenue"
    line2       = "Floor 3"
    city        = "Miami"
    state       = "FL"
    postal_code = "33131"
    country     = "US"
  }

  shipping {
    name  = "Isabela Cooper"
    phone = "+13998935449"
    address {
      line1       = "701 Brickell Avenue"
      line2       = "Floor 3"
      city        = "Miami"
      state       = "FL"
      postal_code = "33131"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0423"

  metadata = {
    company   = "Catalyze Labs"
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0424" {
  name        = "Sara Li"
  email       = "sara.li@daybreak.cloud"
  phone       = "+358126611062"
  description = "Daybreak B.V. — Director of IT, compliance focused"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Level 4"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Sara Li"
    phone = "+358126611062"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Level 4"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0424"

  metadata = {
    company   = "Daybreak B.V."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0425" {
  name        = "Sean Bergstrom"
  email       = "sean.bergstrom@arclight.app"
  phone       = "+886976776228"
  description = "ArcLight KG — CTO, SaaS company scaling rapidly"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Level 4"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Sean Bergstrom"
    phone = "+886976776228"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Level 4"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0425"

  metadata = {
    company   = "ArcLight KG"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0426" {
  name        = "Caleb Ribeiro"
  email       = "caleb.ribeiro@hyperloop.dev"
  phone       = "+353851961159"
  description = "HyperLoop Oy — Staff Engineer, enterprise consultant"

  address {
    line1       = "32 Merrion Square"
    line2       = "Office 303"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Caleb Ribeiro"
    phone = "+353851961159"
    address {
      line1       = "32 Merrion Square"
      line2       = "Office 303"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0426"

  metadata = {
    company   = "HyperLoop Oy"
    plan      = "pro"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0427" {
  name        = "Anastasia Reed"
  email       = "anastasia.reed@rapidscale.dev"
  phone       = "+12960443270"
  description = "RapidScale A/S — Head of Engineering, annual contract"

  address {
    line1       = "150 Fayetteville Street"
    line2       = "Tower 1"
    city        = "Raleigh"
    state       = "NC"
    postal_code = "27601"
    country     = "US"
  }

  shipping {
    name  = "Anastasia Reed"
    phone = "+12960443270"
    address {
      line1       = "150 Fayetteville Street"
      line2       = "Tower 1"
      city        = "Raleigh"
      state       = "NC"
      postal_code = "27601"
      country     = "US"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0427"

  metadata = {
    company   = "RapidScale A/S"
    plan      = "starter"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0428" {
  name        = "Maja Bell"
  email       = "maja.bell@blueshift.ai"
  phone       = "+41792287772"
  description = "BlueShift Oy — Product Manager, workflow automation"

  address {
    line1       = "Rue du Rhone 50"
    line2       = "Apt 6E"
    city        = "Geneva"
    state       = "GE"
    postal_code = "1201"
    country     = "CH"
  }

  shipping {
    name  = "Maja Bell"
    phone = "+41792287772"
    address {
      line1       = "Rue du Rhone 50"
      line2       = "Apt 6E"
      city        = "Geneva"
      state       = "GE"
      postal_code = "1201"
      country     = "CH"
    }
  }

  preferred_locales = ["de", "fr", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0428"

  metadata = {
    company   = "BlueShift Oy"
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0429" {
  name        = "Mikhail Phillips"
  email       = "mikhail.phillips@sable.cloud"
  phone       = "+31412094818"
  description = "Sable S.L. — Product lead, migrated from competitor"

  address {
    line1       = "Dam 1"
    line2       = "Floor 20"
    city        = "Amsterdam"
    state       = "North Holland"
    postal_code = "1012 JS"
    country     = "NL"
  }

  shipping {
    name  = "Mikhail Phillips"
    phone = "+31412094818"
    address {
      line1       = "Dam 1"
      line2       = "Floor 20"
      city        = "Amsterdam"
      state       = "North Holland"
      postal_code = "1012 JS"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0429"

  metadata = {
    company   = "Sable S.L."
    plan      = "starter"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0430" {
  name        = "Wang Iyer"
  email       = "wang.iyer@ripple.com"
  phone       = "+33433971895"
  description = "Ripple Inc. — CEO, climate tech innovator"

  address {
    line1       = "45 Rue de la Republique"
    line2       = "Building A"
    city        = "Lyon"
    postal_code = "69002"
    country     = "FR"
  }

  shipping {
    name  = "Wang Iyer"
    phone = "+33433971895"
    address {
      line1       = "45 Rue de la Republique"
      line2       = "Building A"
      city        = "Lyon"
      postal_code = "69002"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0430"

  metadata = {
    company   = "Ripple Inc."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0431" {
  name        = "Christian Bonnet"
  email       = "christian.bonnet@cascadehq.ai"
  phone       = "+4541118242"
  description = "Cascade HQ Software — VP of Product, expanding to new markets"

  address {
    line1       = "Store Torv 4"
    line2       = "Apt 6E"
    city        = "Aarhus"
    postal_code = "8000"
    country     = "DK"
  }

  shipping {
    name  = "Christian Bonnet"
    phone = "+4541118242"
    address {
      line1       = "Store Torv 4"
      line2       = "Apt 6E"
      city        = "Aarhus"
      postal_code = "8000"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0431"

  metadata = {
    company   = "Cascade HQ Software"
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0432" {
  name        = "Ezra Liu"
  email       = "ezra.liu@horizon.com"
  phone       = "+61461526546"
  description = "Horizon Co. — Head of Engineering, annual contract"

  address {
    line1       = "1 Macquarie Place"
    line2       = "Level 14"
    city        = "Sydney"
    state       = "NSW"
    postal_code = "2000"
    country     = "AU"
  }

  shipping {
    name  = "Ezra Liu"
    phone = "+61461526546"
    address {
      line1       = "1 Macquarie Place"
      line2       = "Level 14"
      city        = "Sydney"
      state       = "NSW"
      postal_code = "2000"
      country     = "AU"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0432"

  metadata = {
    company   = "Horizon Co."
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0433" {
  name        = "Jing Chopra"
  email       = "jing.chopra@tachyonai.io"
  phone       = "+4540578617"
  description = "TachyonAI Group — Enterprise client, onboarded Q3 2025"

  address {
    line1       = "Store Torv 4"
    line2       = "Level 9"
    city        = "Aarhus"
    postal_code = "8000"
    country     = "DK"
  }

  shipping {
    name  = "Jing Chopra"
    phone = "+4540578617"
    address {
      line1       = "Store Torv 4"
      line2       = "Level 9"
      city        = "Aarhus"
      postal_code = "8000"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0433"

  metadata = {
    company   = "TachyonAI Group"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0434" {
  name        = "Layla Parker"
  email       = "layla.parker@aeris.app"
  phone       = "+972967183258"
  description = "Aeris SAS — VP of Product, expanding to new markets"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Suite 300"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Layla Parker"
    phone = "+972967183258"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Suite 300"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0434"

  metadata = {
    company   = "Aeris SAS"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0435" {
  name        = "Olivia Vargas"
  email       = "olivia.vargas@alloy.dev"
  phone       = "+971007494653"
  description = "Alloy Consulting — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Al Maryah Island, Tower 3"
    line2       = "Level 11"
    city        = "Abu Dhabi"
    postal_code = "111111"
    country     = "AE"
  }

  shipping {
    name  = "Olivia Vargas"
    phone = "+971007494653"
    address {
      line1       = "Al Maryah Island, Tower 3"
      line2       = "Level 11"
      city        = "Abu Dhabi"
      postal_code = "111111"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0435"

  metadata = {
    company   = "Alloy Consulting"
    plan      = "starter"
    sales_rep = "slee"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0436" {
  name        = "Emily Cooper"
  email       = "emily.cooper@terraflux.dev"
  phone       = "+578463985547"
  description = "TerraFlux S.L. — Managing Director, long-term partnership"

  address {
    line1       = "Carrera 7 No. 71-52"
    line2       = "Building C"
    city        = "Bogota"
    state       = "Cundinamarca"
    postal_code = "110111"
    country     = "CO"
  }

  shipping {
    name  = "Emily Cooper"
    phone = "+578463985547"
    address {
      line1       = "Carrera 7 No. 71-52"
      line2       = "Building C"
      city        = "Bogota"
      state       = "Cundinamarca"
      postal_code = "110111"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0436"

  metadata = {
    company   = "TerraFlux S.L."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0437" {
  name        = "Tariq Dubois"
  email       = "tariq.dubois@tidal.org"
  phone       = "+817002687681"
  description = "Tidal Digital — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Floor 5"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Tariq Dubois"
    phone = "+817002687681"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Floor 5"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0437"

  metadata = {
    company   = "Tidal Digital"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0438" {
  name        = "Tomasz Schulz"
  email       = "tomasz.schulz@indie.dev"
  phone       = "+46017537030"
  description = "Indie Technologies — Backend Engineer, API integration project"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Office 303"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Tomasz Schulz"
    phone = "+46017537030"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Office 303"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0438"

  metadata = {
    company   = "Indie Technologies"
    plan      = "business"
    sales_rep = "akim"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0439" {
  name        = "Deepika Phillips"
  email       = "deepika.phillips@crux.app"
  phone       = "+46793036149"
  description = "Crux A/S — Growth Lead, high-velocity team"

  address {
    line1       = "Kungsgatan 44"
    line2       = "Level 11"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Deepika Phillips"
    phone = "+46793036149"
    address {
      line1       = "Kungsgatan 44"
      line2       = "Level 11"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0439"

  metadata = {
    company   = "Crux A/S"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0440" {
  name        = "Lina Torres"
  email       = "lina.torres@skybridgecorp.dev"
  phone       = "+814938430894"
  description = "SkyBridge Corp Sp. z o.o. — Frontend Lead, design system migration"

  address {
    line1       = "1-7-1 Konan"
    line2       = "Office 404"
    city        = "Minato-ku"
    state       = "Tokyo"
    postal_code = "108-0075"
    country     = "JP"
  }

  shipping {
    name  = "Lina Torres"
    phone = "+814938430894"
    address {
      line1       = "1-7-1 Konan"
      line2       = "Office 404"
      city        = "Minato-ku"
      state       = "Tokyo"
      postal_code = "108-0075"
      country     = "JP"
    }
  }

  preferred_locales = ["ja", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0440"

  metadata = {
    company   = "SkyBridge Corp Sp. z o.o."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0441" {
  name        = "Beatriz Fournier"
  email       = "beatriz.fournier@prismtech.cloud"
  phone       = "+525803046875"
  description = "PrismTech Corp. — Enterprise client, onboarded Q3 2025"

  address {
    line1       = "Av. Vallarta 2440"
    line2       = "Level 11"
    city        = "Guadalajara"
    state       = "Jalisco"
    postal_code = "44100"
    country     = "MX"
  }

  shipping {
    name  = "Beatriz Fournier"
    phone = "+525803046875"
    address {
      line1       = "Av. Vallarta 2440"
      line2       = "Level 11"
      city        = "Guadalajara"
      state       = "Jalisco"
      postal_code = "44100"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0441"

  metadata = {
    company   = "PrismTech Corp."
    plan      = "pro"
    sales_rep = "akim"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0442" {
  name        = "Daniel Frimpong"
  email       = "daniel.frimpong@innospark.co"
  phone       = "+34325411076"
  description = "InnoSpark Digital — Enterprise client, onboarded Q2 2025"

  address {
    line1       = "Paseo de la Castellana 89"
    line2       = "Tower 1"
    city        = "Madrid"
    state       = "Madrid"
    postal_code = "28014"
    country     = "ES"
  }

  shipping {
    name  = "Daniel Frimpong"
    phone = "+34325411076"
    address {
      line1       = "Paseo de la Castellana 89"
      line2       = "Tower 1"
      city        = "Madrid"
      state       = "Madrid"
      postal_code = "28014"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0442"

  metadata = {
    company   = "InnoSpark Digital"
    plan      = "business"
    sales_rep = "akim"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0443" {
  name        = "Hao Inoue"
  email       = "hao.inoue@jubilee.net"
  phone       = "+358319971791"
  description = "Jubilee LLC — Product lead, migrated from competitor"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Suite 500"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Hao Inoue"
    phone = "+358319971791"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Suite 500"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0443"

  metadata = {
    company   = "Jubilee LLC"
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0444" {
  name        = "Addison Liu"
  email       = "addison.liu@unison.app"
  phone       = "+399611080466"
  description = "Unison Partners — Head of Engineering, annual contract"

  address {
    line1       = "Via Monte Napoleone 8"
    line2       = "Suite 100"
    city        = "Milano"
    state       = "MI"
    postal_code = "20121"
    country     = "IT"
  }

  shipping {
    name  = "Addison Liu"
    phone = "+399611080466"
    address {
      line1       = "Via Monte Napoleone 8"
      line2       = "Suite 100"
      city        = "Milano"
      state       = "MI"
      postal_code = "20121"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0444"

  metadata = {
    company   = "Unison Partners"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0445" {
  name        = "Ren Richter"
  email       = "ren.richter@neutronops.tech"
  phone       = "+34078593110"
  description = "NeutronOps Partners — Security Lead, zero-trust implementation"

  address {
    line1       = "Paseo de la Castellana 89"
    line2       = "Tower 3"
    city        = "Madrid"
    state       = "Madrid"
    postal_code = "28014"
    country     = "ES"
  }

  shipping {
    name  = "Ren Richter"
    phone = "+34078593110"
    address {
      line1       = "Paseo de la Castellana 89"
      line2       = "Tower 3"
      city        = "Madrid"
      state       = "Madrid"
      postal_code = "28014"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0445"

  metadata = {
    company   = "NeutronOps Partners"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0446" {
  name        = "Marie Muller"
  email       = "marie.muller@helixdata.dev"
  phone       = "+56320024968"
  description = "HelixData A/S — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Floor 10"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Marie Muller"
    phone = "+56320024968"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Floor 10"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0446"

  metadata = {
    company   = "HelixData A/S"
    plan      = "business"
    sales_rep = "slee"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0447" {
  name        = "Zoe Kumar"
  email       = "zoe.kumar@turbostack.tech"
  phone       = "+31089203880"
  description = "TurboStack Technologies — Head of Payments, fintech integration"

  address {
    line1       = "Coolsingel 40"
    line2       = "Suite 500"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Zoe Kumar"
    phone = "+31089203880"
    address {
      line1       = "Coolsingel 40"
      line2       = "Suite 500"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0447"

  metadata = {
    company   = "TurboStack Technologies"
    plan      = "pro"
    sales_rep = "mlarsson"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0448" {
  name        = "Lars Green"
  email       = "lars.green@outlook.org"
  phone       = "+575995946521"
  description = "Outlook A/S — Solutions Architect, custom deployment"

  address {
    line1       = "Calle 7 Sur No. 42-70"
    line2       = "Unit B"
    city        = "Medellin"
    state       = "Antioquia"
    postal_code = "050015"
    country     = "CO"
  }

  shipping {
    name  = "Lars Green"
    phone = "+575995946521"
    address {
      line1       = "Calle 7 Sur No. 42-70"
      line2       = "Unit B"
      city        = "Medellin"
      state       = "Antioquia"
      postal_code = "050015"
      country     = "CO"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0448"

  metadata = {
    company   = "Outlook A/S"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0449" {
  name        = "Kavita Castro"
  email       = "kavita.castro@ignite.tech"
  phone       = "+5563620501508"
  description = "Ignite B.V. — Head of Engineering, annual contract"

  address {
    line1       = "Av. Rio Branco 156"
    line2       = "Level 14"
    city        = "Rio de Janeiro"
    state       = "RJ"
    postal_code = "20040-020"
    country     = "BR"
  }

  shipping {
    name  = "Kavita Castro"
    phone = "+5563620501508"
    address {
      line1       = "Av. Rio Branco 156"
      line2       = "Level 14"
      city        = "Rio de Janeiro"
      state       = "RJ"
      postal_code = "20040-020"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0449"

  metadata = {
    company   = "Ignite B.V."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0450" {
  name        = "Jakub Rossi"
  email       = "jakub.rossi@beacon.app"
  phone       = "+12342583230"
  description = "Beacon Inc. — VP of Product, expanding to new markets"

  address {
    line1       = "100 King Street West"
    line2       = "Apt 4C"
    city        = "Toronto"
    state       = "ON"
    postal_code = "M5H 2N2"
    country     = "CA"
  }

  shipping {
    name  = "Jakub Rossi"
    phone = "+12342583230"
    address {
      line1       = "100 King Street West"
      line2       = "Apt 4C"
      city        = "Toronto"
      state       = "ON"
      postal_code = "M5H 2N2"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0450"

  metadata = {
    company   = "Beacon Inc."
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0451" {
  name        = "Levi Matsumoto"
  email       = "levi.matsumoto@wander.co"
  phone       = "+6555289611"
  description = "Wander B.V. — CTO, SaaS company scaling rapidly"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Apt 4C"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Levi Matsumoto"
    phone = "+6555289611"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Apt 4C"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0451"

  metadata = {
    company   = "Wander B.V."
    plan      = "pro"
    sales_rep = "slee"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0452" {
  name        = "Anastasia Watanabe"
  email       = "anastasia.watanabe@foundry.com"
  phone       = "+972993842530"
  description = "Foundry ApS — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Tower 2"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Anastasia Watanabe"
    phone = "+972993842530"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Tower 2"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0452"

  metadata = {
    company   = "Foundry ApS"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0453" {
  name        = "Yumi Osei"
  email       = "yumi.osei@ironforge.dev"
  phone       = "+353868578725"
  description = "Ironforge Partners — VP of Sales, CRM integration"

  address {
    line1       = "32 Merrion Square"
    line2       = "Tower 1"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Yumi Osei"
    phone = "+353868578725"
    address {
      line1       = "32 Merrion Square"
      line2       = "Tower 1"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0453"

  metadata = {
    company   = "Ironforge Partners"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0454" {
  name        = "Manon Han"
  email       = "manon.han@fusiongrid.co"
  phone       = "+433373634669"
  description = "FusionGrid Solutions — VP of Product, expanding to new markets"

  address {
    line1       = "Graben 21"
    line2       = "Floor 8"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Manon Han"
    phone = "+433373634669"
    address {
      line1       = "Graben 21"
      line2       = "Floor 8"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0454"

  metadata = {
    company   = "FusionGrid Solutions"
    plan      = "business"
    sales_rep = "akim"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0455" {
  name        = "Aria Peterson"
  email       = "aria.peterson@kryptonsoft.org"
  phone       = "+46078956776"
  description = "KryptonSoft KG — Head of Payments, fintech integration"

  address {
    line1       = "Kungsgatan 44"
    line2       = "Apt 4C"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Aria Peterson"
    phone = "+46078956776"
    address {
      line1       = "Kungsgatan 44"
      line2       = "Apt 4C"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0455"

  metadata = {
    company   = "KryptonSoft KG"
    plan      = "enterprise"
    sales_rep = "rtan"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0456" {
  name        = "Daniel Nguyen"
  email       = "daniel.nguyen@kryptonsoft.tech"
  phone       = "+911488814311"
  description = "KryptonSoft Pty Ltd — Product lead, migrated from competitor"

  address {
    line1       = "Embassy Tech Village"
    line2       = "Office 505"
    city        = "Bengaluru"
    state       = "Karnataka"
    postal_code = "560103"
    country     = "IN"
  }

  shipping {
    name  = "Daniel Nguyen"
    phone = "+911488814311"
    address {
      line1       = "Embassy Tech Village"
      line2       = "Office 505"
      city        = "Bengaluru"
      state       = "Karnataka"
      postal_code = "560103"
      country     = "IN"
    }
  }

  preferred_locales = ["en", "hi"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0456"

  metadata = {
    company   = "KryptonSoft Pty Ltd"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0457" {
  name        = "Kai Pereira"
  email       = "kai.pereira@warpdrive.app"
  phone       = "+6539284044"
  description = "WarpDrive AB — Data Science Lead, analytics use case"

  address {
    line1       = "1 Fusionopolis Walk"
    line2       = "Tower 1"
    city        = "Singapore"
    postal_code = "138589"
    country     = "SG"
  }

  shipping {
    name  = "Kai Pereira"
    phone = "+6539284044"
    address {
      line1       = "1 Fusionopolis Walk"
      line2       = "Tower 1"
      city        = "Singapore"
      postal_code = "138589"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0457"

  metadata = {
    company   = "WarpDrive AB"
    plan      = "enterprise"
    sales_rep = "jchen"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0458" {
  name        = "Reza Popov"
  email       = "reza.popov@yonder.co"
  phone       = "+4733738987"
  description = "Yonder GmbH — Product Manager, workflow automation"

  address {
    line1       = "Karl Johans gate 22"
    line2       = "Floor 20"
    city        = "Oslo"
    postal_code = "0159"
    country     = "NO"
  }

  shipping {
    name  = "Reza Popov"
    phone = "+4733738987"
    address {
      line1       = "Karl Johans gate 22"
      line2       = "Floor 20"
      city        = "Oslo"
      postal_code = "0159"
      country     = "NO"
    }
  }

  preferred_locales = ["nb", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0458"

  metadata = {
    company   = "Yonder GmbH"
    plan      = "business"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0459" {
  name        = "Bianca Fedorov"
  email       = "bianca.fedorov@xenon.cloud"
  phone       = "+34780529240"
  description = "Xenon Digital — Director of IT, compliance focused"

  address {
    line1       = "Paseo de la Castellana 89"
    line2       = "Building A"
    city        = "Madrid"
    state       = "Madrid"
    postal_code = "28014"
    country     = "ES"
  }

  shipping {
    name  = "Bianca Fedorov"
    phone = "+34780529240"
    address {
      line1       = "Paseo de la Castellana 89"
      line2       = "Building A"
      city        = "Madrid"
      state       = "Madrid"
      postal_code = "28014"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0459"

  metadata = {
    company   = "Xenon Digital"
    plan      = "business"
    sales_rep = "msilva"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0460" {
  name        = "Sean Kuznetsov"
  email       = "sean.kuznetsov@cipher.tech"
  phone       = "+48909022599"
  description = "Cipher Digital — Security Lead, zero-trust implementation"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Suite 500"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Sean Kuznetsov"
    phone = "+48909022599"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Suite 500"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0460"

  metadata = {
    company   = "Cipher Digital"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0461" {
  name        = "Abena Richter"
  email       = "abena.richter@echovault.org"
  phone       = "+33741218209"
  description = "EchoVault A/S — Director of IT, compliance focused"

  address {
    line1       = "8 La Canebiere"
    line2       = "Apt 4C"
    city        = "Marseille"
    postal_code = "13001"
    country     = "FR"
  }

  shipping {
    name  = "Abena Richter"
    phone = "+33741218209"
    address {
      line1       = "8 La Canebiere"
      line2       = "Apt 4C"
      city        = "Marseille"
      postal_code = "13001"
      country     = "FR"
    }
  }

  preferred_locales = ["fr", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0461"

  metadata = {
    company   = "EchoVault A/S"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0462" {
  name        = "Heidi Hall"
  email       = "heidi.hall@jetstream.cloud"
  phone       = "+520580256621"
  description = "JetStream S.r.l. — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Paseo de la Reforma 250"
    line2       = "Apt 4C"
    city        = "Mexico City"
    state       = "CDMX"
    postal_code = "06600"
    country     = "MX"
  }

  shipping {
    name  = "Heidi Hall"
    phone = "+520580256621"
    address {
      line1       = "Paseo de la Reforma 250"
      line2       = "Apt 4C"
      city        = "Mexico City"
      state       = "CDMX"
      postal_code = "06600"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0462"

  metadata = {
    company   = "JetStream S.r.l."
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0463" {
  name        = "Sakura Thomas"
  email       = "sakura.thomas@orchid.cloud"
  phone       = "+6529949387"
  description = "Orchid B.V. — Managing Director, long-term partnership"

  address {
    line1       = "10 Marina Boulevard"
    line2       = "Suite 500"
    city        = "Singapore"
    postal_code = "018956"
    country     = "SG"
  }

  shipping {
    name  = "Sakura Thomas"
    phone = "+6529949387"
    address {
      line1       = "10 Marina Boulevard"
      line2       = "Suite 500"
      city        = "Singapore"
      postal_code = "018956"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0463"

  metadata = {
    company   = "Orchid B.V."
    plan      = "starter"
    sales_rep = "twright"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0464" {
  name        = "Connor Nilsson"
  email       = "connor.nilsson@gradient.org"
  phone       = "+4577790147"
  description = "Gradient Pty Ltd — Data Science Lead, analytics use case"

  address {
    line1       = "Store Torv 4"
    line2       = "Apt 6E"
    city        = "Aarhus"
    postal_code = "8000"
    country     = "DK"
  }

  shipping {
    name  = "Connor Nilsson"
    phone = "+4577790147"
    address {
      line1       = "Store Torv 4"
      line2       = "Apt 6E"
      city        = "Aarhus"
      postal_code = "8000"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0464"

  metadata = {
    company   = "Gradient Pty Ltd"
    plan      = "enterprise"
    sales_rep = "pdupont"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0465" {
  name        = "Fang Nguyen"
  email       = "fang.nguyen@sable.cloud"
  phone       = "+56629160324"
  description = "Sable Technologies — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Tower 2"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Fang Nguyen"
    phone = "+56629160324"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Tower 2"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0465"

  metadata = {
    company   = "Sable Technologies"
    plan      = "starter"
    sales_rep = "mlarsson"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0466" {
  name        = "Matteo Kuznetsov"
  email       = "matteo.kuznetsov@zephyrcloud.io"
  phone       = "+46856724380"
  description = "ZephyrCloud Corp. — Solutions Architect, custom deployment"

  address {
    line1       = "Kungsgatan 44"
    line2       = "Apt 4C"
    city        = "Stockholm"
    state       = "Stockholm"
    postal_code = "111 35"
    country     = "SE"
  }

  shipping {
    name  = "Matteo Kuznetsov"
    phone = "+46856724380"
    address {
      line1       = "Kungsgatan 44"
      line2       = "Apt 4C"
      city        = "Stockholm"
      state       = "Stockholm"
      postal_code = "111 35"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0466"

  metadata = {
    company   = "ZephyrCloud Corp."
    plan      = "starter"
    sales_rep = "twright"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0467" {
  name        = "Sigrid Volkov"
  email       = "sigrid.volkov@fusiongrid.com"
  phone       = "+10412577711"
  description = "FusionGrid Software — Platform Engineer, infrastructure modernization"

  address {
    line1       = "200 Burrard Street"
    line2       = "Office 101"
    city        = "Vancouver"
    state       = "BC"
    postal_code = "V6C 2T6"
    country     = "CA"
  }

  shipping {
    name  = "Sigrid Volkov"
    phone = "+10412577711"
    address {
      line1       = "200 Burrard Street"
      line2       = "Office 101"
      city        = "Vancouver"
      state       = "BC"
      postal_code = "V6C 2T6"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0467"

  metadata = {
    company   = "FusionGrid Software"
    plan      = "enterprise"
    sales_rep = "twright"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0468" {
  name        = "Joshua Scott"
  email       = "joshua.scott@kinesis.dev"
  phone       = "+971418621042"
  description = "Kinesis Inc. — Solutions Architect, custom deployment"

  address {
    line1       = "Dubai Internet City, Building 1"
    line2       = "Level 6"
    city        = "Dubai"
    postal_code = "500001"
    country     = "AE"
  }

  shipping {
    name  = "Joshua Scott"
    phone = "+971418621042"
    address {
      line1       = "Dubai Internet City, Building 1"
      line2       = "Level 6"
      city        = "Dubai"
      postal_code = "500001"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0468"

  metadata = {
    company   = "Kinesis Inc."
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0469" {
  name        = "Ravi Romero"
  email       = "ravi.romero@summit.ai"
  phone       = "+358470900633"
  description = "Summit LLC — Data Science Lead, analytics use case"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Apt 6E"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Ravi Romero"
    phone = "+358470900633"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Apt 6E"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0469"

  metadata = {
    company   = "Summit LLC"
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0470" {
  name        = "Lucas Patel"
  email       = "lucas.patel@xenonlabs.io"
  phone       = "+13122068155"
  description = "XenonLabs Consulting — Platform Engineer, infrastructure modernization"

  address {
    line1       = "1000 Rue De La Gauchetiere"
    line2       = "Building A"
    city        = "Montreal"
    state       = "QC"
    postal_code = "H3B 4W5"
    country     = "CA"
  }

  shipping {
    name  = "Lucas Patel"
    phone = "+13122068155"
    address {
      line1       = "1000 Rue De La Gauchetiere"
      line2       = "Building A"
      city        = "Montreal"
      state       = "QC"
      postal_code = "H3B 4W5"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0470"

  metadata = {
    company   = "XenonLabs Consulting"
    plan      = "pro"
    sales_rep = "msilva"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0471" {
  name        = "Hannah Phillips"
  email       = "hannah.phillips@hyperloop.dev"
  phone       = "+46065063731"
  description = "HyperLoop Corp. — Frontend Lead, design system migration"

  address {
    line1       = "Ostra Hamngatan 16"
    line2       = "Unit A"
    city        = "Gothenburg"
    state       = "Vastra Gotaland"
    postal_code = "411 03"
    country     = "SE"
  }

  shipping {
    name  = "Hannah Phillips"
    phone = "+46065063731"
    address {
      line1       = "Ostra Hamngatan 16"
      line2       = "Unit A"
      city        = "Gothenburg"
      state       = "Vastra Gotaland"
      postal_code = "411 03"
      country     = "SE"
    }
  }

  preferred_locales = ["sv", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0471"

  metadata = {
    company   = "HyperLoop Corp."
    plan      = "business"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0472" {
  name        = "Matteo Reed"
  email       = "matteo.reed@bloom.net"
  phone       = "+353924195625"
  description = "Bloom Technologies — VP of Product, expanding to new markets"

  address {
    line1       = "32 Merrion Square"
    line2       = "Suite 200"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Matteo Reed"
    phone = "+353924195625"
    address {
      line1       = "32 Merrion Square"
      line2       = "Suite 200"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0472"

  metadata = {
    company   = "Bloom Technologies"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0473" {
  name        = "Wilma Alvarez"
  email       = "wilma.alvarez@coresync.net"
  phone       = "+972903091436"
  description = "CoreSync KG — Backend Engineer, API integration project"

  address {
    line1       = "Rothschild Blvd 45"
    line2       = "Apt 3B"
    city        = "Tel Aviv"
    postal_code = "6701101"
    country     = "IL"
  }

  shipping {
    name  = "Wilma Alvarez"
    phone = "+972903091436"
    address {
      line1       = "Rothschild Blvd 45"
      line2       = "Apt 3B"
      city        = "Tel Aviv"
      postal_code = "6701101"
      country     = "IL"
    }
  }

  preferred_locales = ["he", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0473"

  metadata = {
    company   = "CoreSync KG"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0474" {
  name        = "Divya Peterson"
  email       = "divya.peterson@fluxwave.com"
  phone       = "+823975245086"
  description = "FluxWave GmbH — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "20 Sejong-daero 9-gil, Jung-gu"
    line2       = "Office 505"
    city        = "Seoul"
    state       = "Seoul"
    postal_code = "04524"
    country     = "KR"
  }

  shipping {
    name  = "Divya Peterson"
    phone = "+823975245086"
    address {
      line1       = "20 Sejong-daero 9-gil, Jung-gu"
      line2       = "Office 505"
      city        = "Seoul"
      state       = "Seoul"
      postal_code = "04524"
      country     = "KR"
    }
  }

  preferred_locales = ["ko", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0474"

  metadata = {
    company   = "FluxWave GmbH"
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0475" {
  name        = "Ming Hall"
  email       = "ming.hall@xylemtech.co"
  phone       = "+439685270171"
  description = "XylemTech LLC — Operations Director, multi-year deal"

  address {
    line1       = "Graben 21"
    line2       = "Floor 2"
    city        = "Vienna"
    state       = "Wien"
    postal_code = "1010"
    country     = "AT"
  }

  shipping {
    name  = "Ming Hall"
    phone = "+439685270171"
    address {
      line1       = "Graben 21"
      line2       = "Floor 2"
      city        = "Vienna"
      state       = "Wien"
      postal_code = "1010"
      country     = "AT"
    }
  }

  preferred_locales = ["de", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0475"

  metadata = {
    company   = "XylemTech LLC"
    plan      = "pro"
    sales_rep = "pdupont"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0476" {
  name        = "Thomas Lindqvist"
  email       = "thomas.lindqvist@zephyrcloud.co"
  phone       = "+64816742336"
  description = "ZephyrCloud Consulting — VP of Product, expanding to new markets"

  address {
    line1       = "23 Customs Street East"
    line2       = "Building B"
    city        = "Auckland"
    state       = "Auckland"
    postal_code = "1010"
    country     = "NZ"
  }

  shipping {
    name  = "Thomas Lindqvist"
    phone = "+64816742336"
    address {
      line1       = "23 Customs Street East"
      line2       = "Building B"
      city        = "Auckland"
      state       = "Auckland"
      postal_code = "1010"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0476"

  metadata = {
    company   = "ZephyrCloud Consulting"
    plan      = "business"
    sales_rep = "nkumar"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0477" {
  name        = "Akiko Morris"
  email       = "akiko.morris@nimbus.tech"
  phone       = "+353662776896"
  description = "Nimbus Partners — Backend Engineer, API integration project"

  address {
    line1       = "32 Merrion Square"
    line2       = "Building A"
    city        = "Dublin"
    state       = "Dublin"
    postal_code = "D02 EH98"
    country     = "IE"
  }

  shipping {
    name  = "Akiko Morris"
    phone = "+353662776896"
    address {
      line1       = "32 Merrion Square"
      line2       = "Building A"
      city        = "Dublin"
      state       = "Dublin"
      postal_code = "D02 EH98"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0477"

  metadata = {
    company   = "Nimbus Partners"
    plan      = "enterprise"
    sales_rep = "msilva"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0478" {
  name        = "Samuel Popov"
  email       = "samuel.popov@tidal.net"
  phone       = "+6528246747"
  description = "Tidal Ventures — Staff Engineer, enterprise consultant"

  address {
    line1       = "1 Fusionopolis Walk"
    line2       = "Floor 8"
    city        = "Singapore"
    postal_code = "138589"
    country     = "SG"
  }

  shipping {
    name  = "Samuel Popov"
    phone = "+6528246747"
    address {
      line1       = "1 Fusionopolis Walk"
      line2       = "Floor 8"
      city        = "Singapore"
      postal_code = "138589"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0478"

  metadata = {
    company   = "Tidal Ventures"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0479" {
  name        = "Chen Nelson"
  email       = "chen.nelson@jadepathventures.com"
  phone       = "+18576665674"
  description = "JadePath Ventures Ventures — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "100 King Street West"
    line2       = "Apt 4C"
    city        = "Toronto"
    state       = "ON"
    postal_code = "M5H 2N2"
    country     = "CA"
  }

  shipping {
    name  = "Chen Nelson"
    phone = "+18576665674"
    address {
      line1       = "100 King Street West"
      line2       = "Apt 4C"
      city        = "Toronto"
      state       = "ON"
      postal_code = "M5H 2N2"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0479"

  metadata = {
    company   = "JadePath Ventures Ventures"
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0480" {
  name        = "Lina King"
  email       = "lina.king@echovault.tech"
  phone       = "+34875066337"
  description = "EchoVault Group — Startup founder, early adopter program"

  address {
    line1       = "Passeig de Gracia 11"
    line2       = "Unit D"
    city        = "Barcelona"
    state       = "Catalonia"
    postal_code = "08002"
    country     = "ES"
  }

  shipping {
    name  = "Lina King"
    phone = "+34875066337"
    address {
      line1       = "Passeig de Gracia 11"
      line2       = "Unit D"
      city        = "Barcelona"
      state       = "Catalonia"
      postal_code = "08002"
      country     = "ES"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0480"

  metadata = {
    company   = "EchoVault Group"
    plan      = "starter"
    sales_rep = "pdupont"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0481" {
  name        = "Momo Ferreira"
  email       = "momo.ferreira@codezenith.org"
  phone       = "+5520116691836"
  description = "CodeZenith AB — VP of Product, expanding to new markets"

  address {
    line1       = "Av. Afonso Pena 1500"
    line2       = "Tower 3"
    city        = "Belo Horizonte"
    state       = "MG"
    postal_code = "30130-003"
    country     = "BR"
  }

  shipping {
    name  = "Momo Ferreira"
    phone = "+5520116691836"
    address {
      line1       = "Av. Afonso Pena 1500"
      line2       = "Tower 3"
      city        = "Belo Horizonte"
      state       = "MG"
      postal_code = "30130-003"
      country     = "BR"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0481"

  metadata = {
    company   = "CodeZenith AB"
    plan      = "business"
    sales_rep = "rtan"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0482" {
  name        = "Kwame Hajek"
  email       = "kwame.hajek@quill.ai"
  phone       = "+351119524364"
  description = "Quill S.L. — Enterprise client, onboarded Q3 2024"

  address {
    line1       = "Rua de Santa Catarina 112"
    line2       = "Suite 500"
    city        = "Porto"
    postal_code = "4000-322"
    country     = "PT"
  }

  shipping {
    name  = "Kwame Hajek"
    phone = "+351119524364"
    address {
      line1       = "Rua de Santa Catarina 112"
      line2       = "Suite 500"
      city        = "Porto"
      postal_code = "4000-322"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0482"

  metadata = {
    company   = "Quill S.L."
    plan      = "enterprise"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0483" {
  name        = "Francesca Huang"
  email       = "francesca.huang@helixdata.ai"
  phone       = "+6522522372"
  description = "HelixData Solutions — Growth Lead, high-velocity team"

  address {
    line1       = "1 Fusionopolis Walk"
    line2       = "Floor 15"
    city        = "Singapore"
    postal_code = "138589"
    country     = "SG"
  }

  shipping {
    name  = "Francesca Huang"
    phone = "+6522522372"
    address {
      line1       = "1 Fusionopolis Walk"
      line2       = "Floor 15"
      city        = "Singapore"
      postal_code = "138589"
      country     = "SG"
    }
  }

  preferred_locales = ["en", "zh"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0483"

  metadata = {
    company   = "HelixData Solutions"
    plan      = "enterprise"
    sales_rep = "mlarsson"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0484" {
  name        = "Hiroshi Liu"
  email       = "hiroshi.liu@yellowbrick.app"
  phone       = "+64679121416"
  description = "Yellowbrick S.A. — Head of Engineering, annual contract"

  address {
    line1       = "23 Customs Street East"
    line2       = "Level 14"
    city        = "Auckland"
    state       = "Auckland"
    postal_code = "1010"
    country     = "NZ"
  }

  shipping {
    name  = "Hiroshi Liu"
    phone = "+64679121416"
    address {
      line1       = "23 Customs Street East"
      line2       = "Level 14"
      city        = "Auckland"
      state       = "Auckland"
      postal_code = "1010"
      country     = "NZ"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0484"

  metadata = {
    company   = "Yellowbrick S.A."
    plan      = "starter"
    sales_rep = "jchen"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0485" {
  name        = "Wei Gupta"
  email       = "wei.gupta@quasarhq.com"
  phone       = "+886040901380"
  description = "QuasarHQ Systems — CEO, climate tech innovator"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Building A"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Wei Gupta"
    phone = "+886040901380"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Building A"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0485"

  metadata = {
    company   = "QuasarHQ Systems"
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0486" {
  name        = "Erik Becker"
  email       = "erik.becker@quantum.co"
  phone       = "+31566905510"
  description = "Quantum Platform — Solutions Architect, custom deployment"

  address {
    line1       = "Coolsingel 40"
    line2       = "Floor 5"
    city        = "Rotterdam"
    state       = "South Holland"
    postal_code = "3011 AA"
    country     = "NL"
  }

  shipping {
    name  = "Erik Becker"
    phone = "+31566905510"
    address {
      line1       = "Coolsingel 40"
      line2       = "Floor 5"
      city        = "Rotterdam"
      state       = "South Holland"
      postal_code = "3011 AA"
      country     = "NL"
    }
  }

  preferred_locales = ["nl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0486"

  metadata = {
    company   = "Quantum Platform"
    plan      = "pro"
    sales_rep = "nkumar"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0487" {
  name        = "Ama Murphy"
  email       = "ama.murphy@yonder.tech"
  phone       = "+886797863050"
  description = "Yonder Digital — DevOps Manager, CI/CD pipeline integration"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Building B"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Ama Murphy"
    phone = "+886797863050"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Building B"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0487"

  metadata = {
    company   = "Yonder Digital"
    plan      = "starter"
    sales_rep = "kharris"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0488" {
  name        = "Nisha Gustafsson"
  email       = "nisha.gustafsson@quasarhq.tech"
  phone       = "+56671649328"
  description = "QuasarHQ S.L. — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Office 303"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Nisha Gustafsson"
    phone = "+56671649328"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Office 303"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0488"

  metadata = {
    company   = "QuasarHQ S.L."
    plan      = "pro"
    sales_rep = "akim"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0489" {
  name        = "Tariq Castro"
  email       = "tariq.castro@brightpath.cloud"
  phone       = "+398333211602"
  description = "BrightPath Platform — Lead Developer, technical evaluation"

  address {
    line1       = "Via Monte Napoleone 8"
    line2       = "Tower 1"
    city        = "Milano"
    state       = "MI"
    postal_code = "20121"
    country     = "IT"
  }

  shipping {
    name  = "Tariq Castro"
    phone = "+398333211602"
    address {
      line1       = "Via Monte Napoleone 8"
      line2       = "Tower 1"
      city        = "Milano"
      state       = "MI"
      postal_code = "20121"
      country     = "IT"
    }
  }

  preferred_locales = ["it", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0489"

  metadata = {
    company   = "BrightPath Platform"
    plan      = "business"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

resource "stripe_customer" "customer_0490" {
  name        = "Lillian Santos"
  email       = "lillian.santos@blueprintops.io"
  phone       = "+48539915668"
  description = "BlueprintOps Ventures — Head of Payments, fintech integration"

  address {
    line1       = "Rynek Glowny 1"
    line2       = "Office 202"
    city        = "Krakow"
    state       = "Malopolskie"
    postal_code = "31-002"
    country     = "PL"
  }

  shipping {
    name  = "Lillian Santos"
    phone = "+48539915668"
    address {
      line1       = "Rynek Glowny 1"
      line2       = "Office 202"
      city        = "Krakow"
      state       = "Malopolskie"
      postal_code = "31-002"
      country     = "PL"
    }
  }

  preferred_locales = ["pl", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0490"

  metadata = {
    company   = "BlueprintOps Ventures"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0491" {
  name        = "Ryan Rodriguez"
  email       = "ryan.rodriguez@terraflux.io"
  phone       = "+56952569040"
  description = "TerraFlux Co. — Chief Revenue Officer, revenue operations"

  address {
    line1       = "Av. Apoquindo 4001"
    line2       = "Apt 3B"
    city        = "Santiago"
    state       = "RM"
    postal_code = "8320000"
    country     = "CL"
  }

  shipping {
    name  = "Ryan Rodriguez"
    phone = "+56952569040"
    address {
      line1       = "Av. Apoquindo 4001"
      line2       = "Apt 3B"
      city        = "Santiago"
      state       = "RM"
      postal_code = "8320000"
      country     = "CL"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0491"

  metadata = {
    company   = "TerraFlux Co."
    plan      = "enterprise"
    sales_rep = "kharris"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0492" {
  name        = "Asher Yang"
  email       = "asher.yang@northstar.io"
  phone       = "+351608752437"
  description = "Northstar Technologies — Frontend Lead, design system migration"

  address {
    line1       = "Rua Augusta 274"
    line2       = "Floor 10"
    city        = "Lisbon"
    postal_code = "1100-053"
    country     = "PT"
  }

  shipping {
    name  = "Asher Yang"
    phone = "+351608752437"
    address {
      line1       = "Rua Augusta 274"
      line2       = "Floor 10"
      city        = "Lisbon"
      postal_code = "1100-053"
      country     = "PT"
    }
  }

  preferred_locales = ["pt", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0492"

  metadata = {
    company   = "Northstar Technologies"
    plan      = "pro"
    sales_rep = "rtan"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0493" {
  name        = "Hannah Larsson"
  email       = "hannah.larsson@ultranode.app"
  phone       = "+4597374605"
  description = "UltraNode S.r.l. — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Nyhavn 63A"
    line2       = "Floor 15"
    city        = "Copenhagen"
    postal_code = "1051"
    country     = "DK"
  }

  shipping {
    name  = "Hannah Larsson"
    phone = "+4597374605"
    address {
      line1       = "Nyhavn 63A"
      line2       = "Floor 15"
      city        = "Copenhagen"
      postal_code = "1051"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0493"

  metadata = {
    company   = "UltraNode S.r.l."
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0494" {
  name        = "Lin Osei"
  email       = "lin.osei@epsilonai.com"
  phone       = "+358865675661"
  description = "EpsilonAI S.r.l. — Growth Lead, high-velocity team"

  address {
    line1       = "Mannerheimintie 5"
    line2       = "Level 9"
    city        = "Helsinki"
    postal_code = "00100"
    country     = "FI"
  }

  shipping {
    name  = "Lin Osei"
    phone = "+358865675661"
    address {
      line1       = "Mannerheimintie 5"
      line2       = "Level 9"
      city        = "Helsinki"
      postal_code = "00100"
      country     = "FI"
    }
  }

  preferred_locales = ["fi", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0494"

  metadata = {
    company   = "EpsilonAI S.r.l."
    plan      = "business"
    sales_rep = "mlarsson"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0495" {
  name        = "Sienna Jones"
  email       = "sienna.jones@solarwindhq.app"
  phone       = "+886729277423"
  description = "SolarWind HQ Co. — Operations Director, multi-year deal"

  address {
    line1       = "No. 7, Section 5, Xinyi Road"
    line2       = "Floor 3"
    city        = "Taipei"
    postal_code = "11049"
    country     = "TW"
  }

  shipping {
    name  = "Sienna Jones"
    phone = "+886729277423"
    address {
      line1       = "No. 7, Section 5, Xinyi Road"
      line2       = "Floor 3"
      city        = "Taipei"
      postal_code = "11049"
      country     = "TW"
    }
  }

  preferred_locales = ["zh", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0495"

  metadata = {
    company   = "SolarWind HQ Co."
    plan      = "starter"
    sales_rep = "nkumar"
    segment   = "mid-market"
  }
}

resource "stripe_customer" "customer_0496" {
  name        = "Zoe Schulz"
  email       = "zoe.schulz@yonder.com"
  phone       = "+521572018596"
  description = "Yonder ApS — CTO, SaaS company scaling rapidly"

  address {
    line1       = "Paseo de la Reforma 250"
    line2       = "Unit C"
    city        = "Mexico City"
    state       = "CDMX"
    postal_code = "06600"
    country     = "MX"
  }

  shipping {
    name  = "Zoe Schulz"
    phone = "+521572018596"
    address {
      line1       = "Paseo de la Reforma 250"
      line2       = "Unit C"
      city        = "Mexico City"
      state       = "CDMX"
      postal_code = "06600"
      country     = "MX"
    }
  }

  preferred_locales = ["es", "en"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0496"

  metadata = {
    company   = "Yonder ApS"
    plan      = "pro"
    sales_rep = "akim"
    segment   = "startup"
  }
}

resource "stripe_customer" "customer_0497" {
  name        = "Isla Shah"
  email       = "isla.shah@synapseio.ai"
  phone       = "+971176475011"
  description = "SynapseIO Digital — Product lead, migrated from competitor"

  address {
    line1       = "Dubai Internet City, Building 1"
    line2       = "Unit B"
    city        = "Dubai"
    postal_code = "500001"
    country     = "AE"
  }

  shipping {
    name  = "Isla Shah"
    phone = "+971176475011"
    address {
      line1       = "Dubai Internet City, Building 1"
      line2       = "Unit B"
      city        = "Dubai"
      postal_code = "500001"
      country     = "AE"
    }
  }

  preferred_locales = ["ar", "en"]
  tax_exempt        = "exempt"
  invoice_prefix    = "CUS0497"

  metadata = {
    company   = "SynapseIO Digital"
    plan      = "enterprise"
    sales_rep = "slee"
    segment   = "freelancer"
  }
}

resource "stripe_customer" "customer_0498" {
  name        = "Isabella Bergstrom"
  email       = "isabella.bergstrom@catalyze.io"
  phone       = "+353926764921"
  description = "Catalyze Sp. z o.o. — Lead Developer, technical evaluation"

  address {
    line1       = "70 South Mall"
    line2       = "Apt 5D"
    city        = "Cork"
    state       = "Cork"
    postal_code = "T12 W026"
    country     = "IE"
  }

  shipping {
    name  = "Isabella Bergstrom"
    phone = "+353926764921"
    address {
      line1       = "70 South Mall"
      line2       = "Apt 5D"
      city        = "Cork"
      state       = "Cork"
      postal_code = "T12 W026"
      country     = "IE"
    }
  }

  preferred_locales = ["en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0498"

  metadata = {
    company   = "Catalyze Sp. z o.o."
    plan      = "pro"
    sales_rep = "jchen"
    segment   = "enterprise"
  }
}

resource "stripe_customer" "customer_0499" {
  name        = "Faisal Zhou"
  email       = "faisal.zhou@drift.io"
  phone       = "+4589813129"
  description = "Drift Partners — VP of Sales, CRM integration"

  address {
    line1       = "Store Torv 4"
    line2       = "Office 404"
    city        = "Aarhus"
    postal_code = "8000"
    country     = "DK"
  }

  shipping {
    name  = "Faisal Zhou"
    phone = "+4589813129"
    address {
      line1       = "Store Torv 4"
      line2       = "Office 404"
      city        = "Aarhus"
      postal_code = "8000"
      country     = "DK"
    }
  }

  preferred_locales = ["da", "en"]
  tax_exempt        = "reverse"
  invoice_prefix    = "CUS0499"

  metadata = {
    company   = "Drift Partners"
    plan      = "starter"
    sales_rep = "twright"
    segment   = "agency"
  }
}

resource "stripe_customer" "customer_0500" {
  name        = "Wyatt Weber"
  email       = "wyatt.weber@solarwindhq.dev"
  phone       = "+11840118458"
  description = "SolarWind HQ Sp. z o.o. — VP of Product, expanding to new markets"

  address {
    line1       = "1000 Rue De La Gauchetiere"
    line2       = "Suite 300"
    city        = "Montreal"
    state       = "QC"
    postal_code = "H3B 4W5"
    country     = "CA"
  }

  shipping {
    name  = "Wyatt Weber"
    phone = "+11840118458"
    address {
      line1       = "1000 Rue De La Gauchetiere"
      line2       = "Suite 300"
      city        = "Montreal"
      state       = "QC"
      postal_code = "H3B 4W5"
      country     = "CA"
    }
  }

  preferred_locales = ["en", "fr"]
  tax_exempt        = "none"
  invoice_prefix    = "CUS0500"

  metadata = {
    company   = "SolarWind HQ Sp. z o.o."
    plan      = "starter"
    sales_rep = "rtan"
    segment   = "smb"
  }
}

# =============================================================================
# Products (20)
# =============================================================================

resource "stripe_product" "pro_plan" {
  name        = "Pro Plan"
  description = "Professional tier with advanced features, priority support, and team collaboration tools"

  marketing_features {
    name = "Unlimited projects"
  }
  marketing_features {
    name = "Priority email support"
  }
  marketing_features {
    name = "Advanced analytics dashboard"
  }

  metadata = {
    tier     = "pro"
    category = "subscription"
  }
}

resource "stripe_product" "starter_plan" {
  name        = "Starter Plan"
  description = "Perfect for individuals and small teams getting started"

  marketing_features {
    name = "Up to 5 projects"
  }
  marketing_features {
    name = "Community support"
  }

  metadata = {
    tier     = "starter"
    category = "subscription"
  }
}

resource "stripe_product" "business_plan" {
  name        = "Business Plan"
  description = "Built for growing teams that need advanced security, SSO, and dedicated account management"

  marketing_features {
    name = "SSO and SAML authentication"
  }
  marketing_features {
    name = "Dedicated account manager"
  }
  marketing_features {
    name = "99.9% uptime SLA"
  }

  metadata = {
    tier     = "business"
    category = "subscription"
  }
}

resource "stripe_product" "enterprise_plan" {
  name        = "Enterprise Plan"
  description = "Custom-tailored solution for large organizations with on-premise deployment options"

  marketing_features {
    name = "On-premise deployment"
  }
  marketing_features {
    name = "Custom integrations"
  }
  marketing_features {
    name = "24/7 phone support"
  }

  metadata = {
    tier     = "enterprise"
    category = "subscription"
  }
}

resource "stripe_product" "api_addon" {
  name        = "API Access Add-on"
  description = "Unlock full REST and GraphQL API access for custom integrations"

  marketing_features {
    name = "REST and GraphQL endpoints"
  }
  marketing_features {
    name = "Webhook management"
  }

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "analytics_addon" {
  name        = "Advanced Analytics Add-on"
  description = "Real-time dashboards, custom reports, and data export capabilities"

  marketing_features {
    name = "Custom report builder"
  }
  marketing_features {
    name = "CSV and PDF export"
  }

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "storage_addon" {
  name        = "Extra Storage Pack"
  description = "Add 100GB of cloud storage to any plan"
  unit_label  = "pack"

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "onboarding_service" {
  name        = "White-Glove Onboarding"
  description = "Dedicated onboarding specialist, data migration, and 4 weeks of hands-on training"
  type        = "service"

  metadata = {
    tier     = "service"
    category = "one-time"
  }
}

resource "stripe_product" "training_workshop" {
  name        = "Team Training Workshop"
  description = "Full-day live training session for up to 20 team members"
  type        = "service"
  unit_label  = "session"

  metadata = {
    tier     = "service"
    category = "one-time"
  }
}

resource "stripe_product" "training_weekend" {
  name        = "Team Training Weekend"
  description = "Full-weekend live training session for up to 200 team members"
  type        = "service"
  unit_label  = "session"

  metadata = {
    tier     = "service"
    category = "one-time"
  }
}

resource "stripe_product" "support_premium" {
  name        = "Premium Support"
  description = "4-hour response SLA, dedicated Slack channel, and monthly review calls"

  marketing_features {
    name = "4-hour response SLA"
  }
  marketing_features {
    name = "Dedicated Slack channel"
  }

  metadata = {
    tier     = "support"
    category = "subscription"
  }
}

resource "stripe_product" "security_addon" {
  name        = "Security & Compliance Pack"
  description = "SOC 2 audit logs, IP allowlisting, advanced threat detection, and compliance dashboards"

  marketing_features {
    name = "SOC 2 Type II audit logs"
  }
  marketing_features {
    name = "IP allowlisting"
  }

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "mobile_app" {
  name        = "Mobile App Access"
  description = "Native iOS and Android companion apps with offline mode and push notifications"

  marketing_features {
    name = "Offline mode"
  }
  marketing_features {
    name = "Push notifications"
  }

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "data_migration" {
  name        = "Data Migration Service"
  description = "Full-service migration from any competing platform including data validation and rollback plan"
  type        = "service"

  metadata = {
    tier     = "service"
    category = "one-time"
  }
}

resource "stripe_product" "custom_branding" {
  name        = "Custom Branding Pack"
  description = "White-label solution with custom domain, logos, color scheme, and email templates"

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "ai_copilot" {
  name        = "AI Copilot"
  description = "AI-powered assistant for automated workflows, smart suggestions, and natural language queries"

  marketing_features {
    name = "Natural language queries"
  }
  marketing_features {
    name = "Automated workflow builder"
  }
  marketing_features {
    name = "Smart suggestions engine"
  }

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "team_seats_pack" {
  name        = "Team Seats Pack (10)"
  description = "Add 10 additional team member seats to your organization"
  unit_label  = "pack"

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "consulting_hour" {
  name        = "Solutions Consulting"
  description = "One hour of expert consulting for architecture review, optimization, or custom development"
  type        = "service"
  unit_label  = "hour"

  metadata = {
    tier     = "service"
    category = "one-time"
  }
}

resource "stripe_product" "uptime_sla" {
  name        = "99.99% Uptime SLA"
  description = "Enhanced SLA with 99.99% availability guarantee and financial credits for downtime"

  marketing_features {
    name = "99.99% availability guarantee"
  }
  marketing_features {
    name = "Financial downtime credits"
  }

  metadata = {
    tier     = "addon"
    category = "subscription"
  }
}

resource "stripe_product" "audit_log_export" {
  name        = "Audit Log & Data Export"
  description = "Comprehensive audit logging with automated exports to S3, GCS, or Azure Blob Storage"

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

resource "stripe_product" "sandbox_env" {
  name        = "Sandbox Environment"
  description = "Isolated sandbox environment for testing integrations, staging deployments, and QA workflows"

  metadata = {
    tier     = "addon"
    category = "addon"
  }
}

# =============================================================================
# Prices (20) — linked to the products above
# =============================================================================

resource "stripe_price" "pro_monthly" {
  product     = stripe_product.pro_plan.id
  currency    = "usd"
  unit_amount = 2900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "pro_yearly" {
  product     = stripe_product.pro_plan.id
  currency    = "usd"
  unit_amount = 29000

  recurring {
    interval = "year"
  }
}

resource "stripe_price" "starter_monthly" {
  product     = stripe_product.starter_plan.id
  currency    = "usd"
  unit_amount = 900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "starter_yearly" {
  product     = stripe_product.starter_plan.id
  currency    = "usd"
  unit_amount = 9000

  recurring {
    interval = "year"
  }
}

resource "stripe_price" "business_monthly" {
  product     = stripe_product.business_plan.id
  currency    = "usd"
  unit_amount = 7900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "business_yearly" {
  product     = stripe_product.business_plan.id
  currency    = "usd"
  unit_amount = 79000

  recurring {
    interval = "year"
  }
}

resource "stripe_price" "enterprise_monthly" {
  product     = stripe_product.enterprise_plan.id
  currency    = "usd"
  unit_amount = 24900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "api_addon_monthly" {
  product     = stripe_product.api_addon.id
  currency    = "usd"
  unit_amount = 1500

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "analytics_addon_monthly" {
  product     = stripe_product.analytics_addon.id
  currency    = "usd"
  unit_amount = 1900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "storage_addon_monthly" {
  product     = stripe_product.storage_addon.id
  currency    = "usd"
  unit_amount = 499

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "onboarding_service_once" {
  product     = stripe_product.onboarding_service.id
  currency    = "usd"
  unit_amount = 250000
}

resource "stripe_price" "training_workshop_once" {
  product     = stripe_product.training_workshop.id
  currency    = "usd"
  unit_amount = 150000
}

resource "stripe_price" "training_workshop_weekend" {
  product     = stripe_product.training_weekend.id
  currency    = "gbp"
  unit_amount = 99999999
}

resource "stripe_price" "support_premium_monthly" {
  product     = stripe_product.support_premium.id
  currency    = "usd"
  unit_amount = 9900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "security_addon_monthly" {
  product     = stripe_product.security_addon.id
  currency    = "usd"
  unit_amount = 4900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "mobile_app_monthly" {
  product     = stripe_product.mobile_app.id
  currency    = "usd"
  unit_amount = 500

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "data_migration_once" {
  product     = stripe_product.data_migration.id
  currency    = "usd"
  unit_amount = 500000
}

resource "stripe_price" "custom_branding_monthly" {
  product     = stripe_product.custom_branding.id
  currency    = "usd"
  unit_amount = 3900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "ai_copilot_monthly" {
  product     = stripe_product.ai_copilot.id
  currency    = "usd"
  unit_amount = 2900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "team_seats_monthly" {
  product     = stripe_product.team_seats_pack.id
  currency    = "usd"
  unit_amount = 4900

  recurring {
    interval = "month"
  }
}

resource "stripe_price" "consulting_hour_once" {
  product     = stripe_product.consulting_hour.id
  currency    = "usd"
  unit_amount = 30000
}

# =============================================================================
# Coupons (20)
# =============================================================================

resource "stripe_coupon" "launch_10" {
  name        = "Launch Day 10% Off"
  percent_off = 10
  duration    = "once"

  metadata = {
    campaign = "launch_2025"
    channel  = "website"
  }
}

resource "stripe_coupon" "welcome_15" {
  name        = "Welcome 15% Off"
  percent_off = 15
  duration    = "once"
  max_redemptions = 500

  metadata = {
    campaign = "new_user_welcome"
    channel  = "onboarding"
  }
}

resource "stripe_coupon" "summer_sale_20" {
  name        = "Summer Sale 20% Off"
  percent_off = 20
  duration    = "repeating"
  duration_in_months = 3

  metadata = {
    campaign = "summer_2025"
    channel  = "email"
  }
}

resource "stripe_coupon" "black_friday_30" {
  name        = "Black Friday 30% Off"
  percent_off = 30
  duration    = "once"
  max_redemptions = 1000

  metadata = {
    campaign = "bfcm_2025"
    channel  = "all"
  }
}

resource "stripe_coupon" "referral_20" {
  name        = "Referral Reward 20% Off"
  percent_off = 20
  duration    = "repeating"
  duration_in_months = 6

  metadata = {
    campaign = "referral_program"
    channel  = "referral"
  }
}

resource "stripe_coupon" "annual_25" {
  name        = "Annual Commitment 25% Off"
  percent_off = 25
  duration    = "forever"

  metadata = {
    campaign = "annual_incentive"
    channel  = "sales"
  }
}

resource "stripe_coupon" "five_dollar_off" {
  name       = "$5 Off First Month"
  amount_off = 500
  currency   = "usd"
  duration   = "once"

  metadata = {
    campaign = "starter_promo"
    channel  = "product"
  }
}

resource "stripe_coupon" "ten_dollar_off" {
  name       = "$10 Off Any Plan"
  amount_off = 1000
  currency   = "usd"
  duration   = "once"
  max_redemptions = 200

  metadata = {
    campaign = "flash_sale_q1"
    channel  = "social"
  }
}

resource "stripe_coupon" "fifty_dollar_off" {
  name       = "$50 Off Annual Plan"
  amount_off = 5000
  currency   = "usd"
  duration   = "once"

  metadata = {
    campaign = "annual_discount"
    channel  = "email"
  }
}

resource "stripe_coupon" "partner_40" {
  name        = "Partner Program 40% Off"
  percent_off = 40
  duration    = "forever"

  metadata = {
    campaign = "partner_program"
    channel  = "partnerships"
  }
}

resource "stripe_coupon" "student_50" {
  name        = "Student Discount 50% Off"
  percent_off = 50
  duration    = "repeating"
  duration_in_months = 12

  metadata = {
    campaign = "education"
    channel  = "edu_portal"
  }
}

resource "stripe_coupon" "nonprofit_35" {
  name        = "Nonprofit 35% Off"
  percent_off = 35
  duration    = "forever"

  metadata = {
    campaign = "social_impact"
    channel  = "partnerships"
  }
}

resource "stripe_coupon" "hundred_dollar_off" {
  name       = "$100 Off Enterprise Onboarding"
  amount_off = 10000
  currency   = "usd"
  duration   = "once"

  metadata = {
    campaign = "enterprise_incentive"
    channel  = "sales"
  }
}

resource "stripe_coupon" "early_bird_15" {
  name        = "Early Bird 15% Off"
  percent_off = 15
  duration    = "repeating"
  duration_in_months = 2
  max_redemptions = 100

  metadata = {
    campaign = "early_access"
    channel  = "waitlist"
  }
}

resource "stripe_coupon" "loyalty_10" {
  name        = "Loyalty Reward 10% Off"
  percent_off = 10
  duration    = "forever"

  metadata = {
    campaign = "retention"
    channel  = "cs_team"
  }
}

resource "stripe_coupon" "twenty_dollar_off" {
  name       = "$20 Off Migration"
  amount_off = 2000
  currency   = "usd"
  duration   = "once"

  metadata = {
    campaign = "migration_incentive"
    channel  = "sales"
  }
}

resource "stripe_coupon" "new_year_25" {
  name        = "New Year 25% Off"
  percent_off = 25
  duration    = "repeating"
  duration_in_months = 3
  max_redemptions = 750

  metadata = {
    campaign = "new_year_2026"
    channel  = "email"
  }
}

resource "stripe_coupon" "vip_60" {
  name        = "VIP 60% Off"
  percent_off = 60
  duration    = "once"

  metadata = {
    campaign = "vip_exclusive"
    channel  = "account_management"
  }
}

resource "stripe_coupon" "two_hundred_off" {
  name       = "$200 Off Training Package"
  amount_off = 20000
  currency   = "usd"
  duration   = "once"

  metadata = {
    campaign = "training_promo"
    channel  = "sales"
  }
}

resource "stripe_coupon" "startup_program" {
  name        = "Startup Program 75% Off"
  percent_off = 75
  duration    = "repeating"
  duration_in_months = 12

  metadata = {
    campaign = "startup_program"
    channel  = "partnerships"
  }
}

# =============================================================================
# Webhook Endpoint
# =============================================================================

resource "stripe_webhook_endpoint" "payments" {
  url = "https://api.example.com/webhooks/stripe"

  enabled_events = [
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "customer.subscription.created",
    "customer.subscription.deleted",
  ]
}

# =============================================================================
# Outputs
# =============================================================================

output "price_id" {
  value = stripe_price.pro_monthly.id
}
