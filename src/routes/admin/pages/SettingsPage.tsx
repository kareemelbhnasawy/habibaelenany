import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Loader2, Save } from "lucide-react";

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

export function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
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
      console.error("Error fetching settings", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await supabase.from("site_config").upsert({
        key: "site_info",
        value: siteInfo,
      });

      await supabase.from("site_config").upsert({
        key: "contact_info",
        value: contactInfo,
      });

      alert("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-display font-semibold text-white">
          Settings
        </h2>
        <p className="text-gray-400">
          Manage global site information and contact details.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* General Info */}
        <section className="bg-zinc-900/50 p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-lg font-medium text-white mb-4">
            General Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Site Title
              </label>
              <input
                value={siteInfo.title}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Tagline / Description
              </label>
              <input
                value={siteInfo.description}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Bio
            </label>
            <textarea
              value={siteInfo.bio}
              onChange={(e) =>
                setSiteInfo({ ...siteInfo, bio: e.target.value })
              }
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none h-32 resize-none"
            />
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-zinc-900/50 p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Contact & Socials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Instagram URL
              </label>
              <input
                value={contactInfo.instagram}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, instagram: e.target.value })
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Behance URL
              </label>
              <input
                value={contactInfo.behance}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, behance: e.target.value })
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                LinkedIn URL
              </label>
              <input
                value={contactInfo.linkedin}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, linkedin: e.target.value })
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
