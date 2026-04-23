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
  singletons: {},
});
