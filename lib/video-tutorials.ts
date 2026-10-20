export type VideoTutorial = {
  id: string
  title: string
  description: string
  category: string
}

export const tutorialPlaylistUrl =
  "https://www.youtube.com/playlist?list=PLepwjAtXgkt4"

export const videoTutorials: readonly VideoTutorial[] = [
  {
    id: "yurbpv0JY80",
    title: "BladeVault Overview",
    description:
      "A quick tour of the collection manager, from your first record to the views that help you understand the whole vault.",
    category: "Start here",
  },
  {
    id: "5co8rHxLZgE",
    title: "Add Your First Knife",
    description:
      "Start with a first entry and see how BladeVault turns one knife into a useful, searchable record.",
    category: "Getting started",
  },
  {
    id: "MftvtfNx570",
    title: "Install BladeVault on macOS",
    description:
      "Follow the macOS installation flow from download to first launch.",
    category: "Setup",
  },
  {
    id: "AHexGVYq_yc",
    title: "Install BladeVault on Windows 11",
    description:
      "Get BladeVault running on Windows 11 and ready for your collection.",
    category: "Setup",
  },
  {
    id: "vOOuwQlW0hI",
    title: "Batch Import Multiple Knives from URLs",
    description:
      "Bring several product pages into the vault in one guided batch-import workflow.",
    category: "Import",
  },
  {
    id: "GJiksvGPBs0",
    title: "Create and Save Knife Comparison Lists",
    description:
      "Compare knives side by side and keep named lists for the questions you revisit.",
    category: "Compare",
  },
  {
    id: "kApN2egnnRo",
    title: "Backup and Restore Your Knife Collection",
    description:
      "Create a local ZIP backup and restore your collection when you need a dependable way back.",
    category: "Protect",
  },
  {
    id: "xxyMIwL4gBU",
    title: "Import Knives from Product URLs",
    description:
      "See the automatic product-page import flow and how to review a scraped record before saving it.",
    category: "Import",
  },
  {
    id: "H5Vg5duWKlY",
    title: "Save and Capture Knife Product Pages",
    description:
      "Capture a product page alongside its record so the source stays close to the data.",
    category: "Sources",
  },
  {
    id: "dTpAvL_w9n4",
    title: "Activity Logs and Change History",
    description:
      "Track updates across the collection with a clear history of changes.",
    category: "Maintain",
  },
  {
    id: "iFuS-uAehS4",
    title: "Customize Your Knife Collection",
    description:
      "Adjust appearance, layout, and themes so the vault works the way you want to use it.",
    category: "Customize",
  },
  {
    id: "2lhAQx7TqQE",
    title: "Collection Insights and Analytics",
    description:
      "Explore the patterns, materials, makers, and completeness of your own collection.",
    category: "Insights",
  },
  {
    id: "l3erNRSJTfM",
    title: "Custom Fields",
    description:
      "Add your own specifications and filters when the standard fields are not enough.",
    category: "Customize",
  },
  {
    id: "gbo1asWI9wo",
    title: "Model Families and Variants",
    description:
      "Keep different versions of the same model together without flattening their individual details.",
    category: "Organize",
  },
  {
    id: "VCxAo_N0_EE",
    title: "Edit Knife Details",
    description:
      "Update specifications, images, and missing fields as your records get better over time.",
    category: "Maintain",
  },
  {
    id: "4EXzNb24Odw",
    title: "Bulk Pin and Unpin Knives",
    description:
      "Organize favorite knives in a few deliberate actions with bulk pin and unpin controls.",
    category: "Organize",
  },
  {
    id: "gzKZdG84TFk",
    title: "Data Completeness and Quality",
    description:
      "Find missing specifications and work through the records that need another pass.",
    category: "Maintain",
  },
  {
    id: "M5ohytCLeCU",
    title: "Smart Collections",
    description:
      "Save a question as a live filter so the view keeps updating with your vault.",
    category: "Organize",
  },
  {
    id: "_Yrw6v5V1yc",
    title: "Knife Maintenance Tracking",
    description:
      "Keep sharpening, cleaning, and service history alongside the knife it belongs to.",
    category: "Care",
  },
]

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
}

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}

export function youtubeThumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
