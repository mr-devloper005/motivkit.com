import { ArticlesMagazineLead } from "@/components/marketing/articles-magazine-lead";
import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("article", {
    path: "/articles",
    title: taskPageMetadata.article.title,
    description: taskPageMetadata.article.description,
  });

type ArticlesPageProps = {
  searchParams?: Promise<{ category?: string | string[] }>;
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const category = Array.isArray(resolvedSearchParams.category)
    ? resolvedSearchParams.category[0]
    : resolvedSearchParams.category;

  return <TaskListPage task="article" category={category} leading={<ArticlesMagazineLead selectedCategory={category} />} />;
}
