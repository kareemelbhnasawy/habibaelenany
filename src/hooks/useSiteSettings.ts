import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface GeneralConfig {
  hero_title: string;
  hero_subtitle: string;
  footer_image_url: string;
  filmmaking_speed_ms: number;
  cta_title: string;
  cta_subtitle: string;
}

export interface SectionOrder {
  [category: string]: string[];
}

export interface SiteInfo {
  title: string;
  description: string;
  bio: string;
}

export interface ContactInfo {
  email: string;
  instagram: string;
  behance: string;
  linkedin: string;
}

export function useSiteSettings() {
  const [loading, setLoading] = useState(true);

  // From site_settings table
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>({
    hero_title: "",
    hero_subtitle: "",
    footer_image_url: "",
    filmmaking_speed_ms: 800,
    cta_title: "",
    cta_subtitle: "",
  });
  const [sectionOrder, setSectionOrder] = useState<SectionOrder>({});

  // From site_config table
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    title: "",
    description: "",
    bio: "",
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    instagram: "",
    behance: "",
    linkedin: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    try {
      // 1. Fetch site_settings
      const { data: settingsData, error: settingsError } = await supabase
        .from("site_settings")
        .select("*");
      if (settingsError) throw settingsError;

      settingsData?.forEach((row) => {
        if (row.key === "general_config") {
          setGeneralConfig(row.value);
        } else if (row.key === "section_order") {
          setSectionOrder(row.value);
        }
      });

      // 2. Fetch site_config
      const { data: configData, error: configError } = await supabase
        .from("site_config")
        .select("*");
      if (configError) throw configError;

      configData?.forEach((row) => {
        if (row.key === "site_info") {
          setSiteInfo(row.value);
        } else if (row.key === "contact_info") {
          setContactInfo(row.value);
        }
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateGeneralConfig(newConfig: Partial<GeneralConfig>) {
    const updated = { ...generalConfig, ...newConfig };
    setGeneralConfig(updated);
    await supabase
      .from("site_settings")
      .upsert({ key: "general_config", value: updated });
  }

  async function updateSectionOrder(category: string, newOrder: string[]) {
    const updated = { ...sectionOrder, [category]: newOrder };
    setSectionOrder(updated); // Optimistic
    await supabase
      .from("site_settings")
      .upsert({ key: "section_order", value: updated });
  }

  // Helpers for site_config updates (optional, but good for consistency)
  async function updateSiteInfo(newInfo: SiteInfo) {
    setSiteInfo(newInfo);
    await supabase
      .from("site_config")
      .upsert({ key: "site_info", value: newInfo });
  }

  async function updateContactInfo(newInfo: ContactInfo) {
    setContactInfo(newInfo);
    await supabase
      .from("site_config")
      .upsert({ key: "contact_info", value: newInfo });
  }

  return {
    loading,
    generalConfig,
    sectionOrder,
    siteInfo,
    contactInfo,
    updateGeneralConfig,
    updateSectionOrder,
    updateSiteInfo,
    updateContactInfo,
    refresh: fetchSettings,
  };
}
