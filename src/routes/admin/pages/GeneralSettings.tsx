import { useState, useEffect } from "react";
import {
  useSiteSettings,
  type SectionOrder,
} from "../../../hooks/useSiteSettings";
import { Loader2, Save, Upload } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { SectionOrderEditor } from "../../../components/admin/shared/SectionOrderEditor";

interface SiteInfo {
  title: string;
  description: string;
  bio: string;
}

interface ContactInfo {
  email: string;
  instagram: string;
  behance: string;
  linkedin: string;
}

export function GeneralSettings() {
  const {
    generalConfig,
    sectionOrder,
    updateGeneralConfig,
    updateSectionOrder,
    loading: loadingSettings,
  } = useSiteSettings();

  // Settings from site_config table (orphaned SettingsPage)
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
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Settings from site_settings table (New General Config)
  const [formState, setFormState] = useState(generalConfig);
  const [sectionOrderState, setSectionOrderState] = useState<SectionOrder>({});

  const [isSaving, setIsSaving] = useState(false);
  const [uploadingFooter, setUploadingFooter] = useState(false);

  useEffect(() => {
    fetchSiteConfig();
  }, []);

  useEffect(() => {
    if (!loadingSettings) {
      setFormState(generalConfig);
      setSectionOrderState(sectionOrder);
    }
  }, [loadingSettings, generalConfig, sectionOrder]);

  async function fetchSiteConfig() {
    setLoadingConfig(true);
    try {
      const { data: siteData } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "site_info")
        .single();

      const { data: contactData } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "contact_info")
        .single();

      if (siteData) setSiteInfo(siteData.value);
      if (contactData) setContactInfo(contactData.value);
    } catch (error) {
      console.error("Error fetching site config", error);
    } finally {
      setLoadingConfig(false);
    }
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Save general_config (Hero, Footer, Speed)
      await updateGeneralConfig(formState);

      // 2. Save section_order
      for (const [category, order] of Object.entries(sectionOrderState)) {
        await updateSectionOrder(category, order);
      }

      // 3. Save site_info and contact_info (site_config table)
      await supabase.from("site_config").upsert({
        key: "site_info",
        value: siteInfo,
      });

      await supabase.from("site_config").upsert({
        key: "contact_info",
        value: contactInfo,
      });

      alert("All settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFooterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploadingFooter(true);
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `footer-${Date.now()}.${fileExt}`;
    const filePath = `assets/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("portfolio-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-media").getPublicUrl(filePath);

      // Auto-save the new URL
      await updateGeneralConfig({ ...formState, footer_image_url: publicUrl });
      setFormState((prev) => ({ ...prev, footer_image_url: publicUrl }));
    } catch (error) {
      console.error("Error uploading footer:", error);
      alert("Error uploading footer image");
    } finally {
      setUploadingFooter(false);
    }
  };

  if (loadingSettings || loadingConfig) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-display font-semibold text-white">
          General Settings
        </h2>
        <p className="text-gray-400">
          Manage global website content and configurations.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section: General Info (Merged from SettingsPage) */}
        <section className="bg-zinc-900/30 p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-xl font-medium text-white border-b border-white/5 pb-2">
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Site Title</label>
              <input
                value={siteInfo.title}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, title: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">
                Tagline / Description
              </label>
              <input
                value={siteInfo.description}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, description: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Bio</label>
            <textarea
              value={siteInfo.bio}
              onChange={(e) =>
                setSiteInfo({ ...siteInfo, bio: e.target.value })
              }
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 h-32"
            />
          </div>
        </section>

        {/* Section: Hero Text */}
        <section className="bg-zinc-900/30 p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-xl font-medium text-white border-b border-white/5 pb-2">
            Hero Carousel Text
          </h3>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Main Title</label>
            <input
              type="text"
              value={formState.hero_title}
              onChange={(e) =>
                setFormState({ ...formState, hero_title: e.target.value })
              }
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Subtitle</label>
            <textarea
              value={formState.hero_subtitle}
              onChange={(e) =>
                setFormState({ ...formState, hero_subtitle: e.target.value })
              }
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 h-24"
            />
          </div>
        </section>

        {/* Section: Contact & Socials (Merged from SettingsPage) */}
        <section className="bg-zinc-900/30 p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-xl font-medium text-white border-b border-white/5 pb-2">
            Contact & Socials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Instagram URL</label>
              <input
                value={contactInfo.instagram}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, instagram: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Behance URL</label>
              <input
                value={contactInfo.behance}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, behance: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">LinkedIn URL</label>
              <input
                value={contactInfo.linkedin}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, linkedin: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
        </section>

        {/* Section: Section Ordering */}
        <section className="bg-zinc-900/30 p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-xl font-medium text-white border-b border-white/5 pb-2">
            Section Ordering
          </h3>
          <p className="text-sm text-gray-500">
            Drag to reorder sections for each page.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionOrderEditor
              category="Photography"
              sections={sectionOrderState.Photography || []}
              onChange={(newOrder) =>
                setSectionOrderState((prev) => ({
                  ...prev,
                  Photography: newOrder,
                }))
              }
            />
            <SectionOrderEditor
              category="Filmmaking"
              sections={sectionOrderState.Filmmaking || []}
              onChange={(newOrder) =>
                setSectionOrderState((prev) => ({
                  ...prev,
                  Filmmaking: newOrder,
                }))
              }
            />
            <SectionOrderEditor
              category="Short Form"
              sections={sectionOrderState["Short Form"] || []}
              onChange={(newOrder) =>
                setSectionOrderState((prev) => ({
                  ...prev,
                  "Short Form": newOrder,
                }))
              }
            />
          </div>
        </section>

        {/* Section: Filmmaking Speed */}
        <section className="bg-zinc-900/30 p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-xl font-medium text-white border-b border-white/5 pb-2">
            Filmmaking Gallery
          </h3>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">
              Slideshow Speed (milliseconds)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={formState.filmmaking_speed_ms}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    filmmaking_speed_ms: parseInt(e.target.value) || 800,
                  })
                }
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 w-32"
              />
              <span className="text-xs text-gray-500">
                Lower = Faster. 800ms is default.
              </span>
            </div>
          </div>
        </section>

        {/* Section: Bottom CTA Section */}
        <section className="bg-zinc-900/30 p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-xl font-medium text-white border-b border-white/5 pb-2">
            Bottom CTA Section
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Headline</label>
              <input
                type="text"
                placeholder="Let's Create Something Together"
                value={formState.cta_title}
                onChange={(e) =>
                  setFormState({ ...formState, cta_title: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Subtext</label>
              <textarea
                placeholder="Open for collaborations and commercial projects."
                value={formState.cta_subtitle}
                onChange={(e) =>
                  setFormState({ ...formState, cta_subtitle: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 h-24"
              />
            </div>

            <div className="pt-4 border-t border-white/5">
              <label className="text-sm text-gray-400 block mb-2">
                Background Image
              </label>
              <div className="flex gap-6 items-start flex-wrap">
                <div className="relative group w-48 aspect-[3/4] bg-black/50 rounded-lg overflow-hidden border border-white/10 shrink-0">
                  {formState.footer_image_url ? (
                    <img
                      src={formState.footer_image_url}
                      alt="Footer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-600">
                      No Image
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-400 max-w-sm">
                    Upload the background image for the CTA section.
                  </p>

                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    {uploadingFooter ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>Upload New Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFooterUpload}
                      disabled={uploadingFooter}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="pt-4 flex justify-end sticky bottom-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 shadow-lg"
          >
            {isSaving ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
