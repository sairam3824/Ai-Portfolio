interface ResourceLink {
  title: string;
  url: string;
  description?: string;
}

interface ResourceCategory {
  category: string;
  links: ResourceLink[];
}

interface BlogResourcesProps {
  resources: ResourceCategory[];
}

export const BlogResources = ({ resources }: BlogResourcesProps) => {
  if (!resources || resources.length === 0) return null;

  return (
    <details className="mb-8 border border-gray-200 rounded-lg">
      <summary className="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-gray-900 rounded-t-lg">
        Sources & References
      </summary>
      <div className="p-4 space-y-4">
        {resources.map((category, idx) => (
          <div key={idx} className="space-y-3">
            <h6 className="font-semibold text-gray-900">{category.category}</h6>
            <div className="grid gap-2">
              {category.links.map((link, linkIdx) => (
                <div key={linkIdx}>
                  <a
                    href={link.url}
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </a>
                  {link.description && (
                    <span className="text-gray-600 text-sm"> — {link.description}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
};
