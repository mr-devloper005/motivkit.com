import { BlogMagazineLead } from "@/components/marketing/blog-magazine-lead";
import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";

export const revalidate = 3;
export const generateMetadata = () => buildTaskMetadata("comment");

export default async function BlogPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const { category } = await searchParams || {};
  return <TaskListPage task="comment" category={category} leading={<BlogMagazineLead />} />;
}
