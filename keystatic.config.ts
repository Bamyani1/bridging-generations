import { config } from "@keystatic/core";
import {
  activityCollection,
  blogPostCollection,
  boardMemberCollection,
  galleryImageCollection,
  projectCollection,
  schoolCollection,
  studentCollection,
  successStoryCollection,
  testimonialCollection,
} from "./keystatic/collections";
import {
  contactPageSingleton,
  donatePageSingleton,
  donorsPageSingleton,
  footerSingleton,
  navigationSingleton,
  siteSettingsSingleton,
  statsSnapshotSingleton,
  termsPageSingleton,
} from "./keystatic/singletons";

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Bridging Generations" },
  },
  collections: {
    school: schoolCollection,
    student: studentCollection,
    project: projectCollection,
    activity: activityCollection,
    blogPost: blogPostCollection,
    successStory: successStoryCollection,
    testimonial: testimonialCollection,
    galleryImage: galleryImageCollection,
    boardMember: boardMemberCollection,
  },
  singletons: {
    siteSettings: siteSettingsSingleton,
    statsSnapshot: statsSnapshotSingleton,
    donorsPage: donorsPageSingleton,
    donatePage: donatePageSingleton,
    contactPage: contactPageSingleton,
    termsPage: termsPageSingleton,
    navigation: navigationSingleton,
    footer: footerSingleton,
  },
});
