import { Heart, BookOpen, Dumbbell, User } from "lucide-react";

export const CATEGORIES = ["Health", "Study", "Fitness", "Personal"];

export const CATEGORY_META = {
  Health: { icon: Heart, className: "cat-health" },
  Study: { icon: BookOpen, className: "cat-study" },
  Fitness: { icon: Dumbbell, className: "cat-fitness" },
  Personal: { icon: User, className: "cat-personal" },
};