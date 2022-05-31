import { useSWRConfig } from 'swr';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Props = {
  hasInstace: boolean;
  hasCategories: boolean;
};

export default function EmptyState({ hasInstace, hasCategories }: Props) {
  const { mutate } = useSWRConfig();

  const handleAddInstance = async () => {
    try {
      const res = await fetch('/api/instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        }),
      });

      if (res.ok) {
        mutate('/api/instance');
        toast.success('Your monthly budget has been created.');
      } else {
        toast.error('There was an issue creating your monthly budget.');
      }
    } catch (error) {
      toast.error('There was an issue creating your monthly budget.');
    }
  };

  return (
    <div className="mt-12 rounded-lg bg-white p-8 text-center shadow-lg">
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome to funds
      </h1>

      <p className="mt-4 mb-8">
        You currently don&apos;t have a budget started for this month.
      </p>

      {!hasInstace && (
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
          onClick={handleAddInstance}
        >
          Start new month
        </button>
      )}

      {hasInstace && !hasCategories && (
        <Link href="/dashboard/categories" passHref>
          <a className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0">
            Start new month
          </a>
        </Link>
      )}
    </div>
  );
}
