import { Fragment, ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookmarkEmpty,
  Calendar,
  Cancel,
  Home,
  LogOut,
  Menu,
} from 'iconoir-react';
import { Dialog, Transition } from '@headlessui/react';
import { Toaster } from 'react-hot-toast';

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ');
}

type SidebarNavItemProps = {
  href: string;
  icon: ReactNode;
  text: string;
};

const SidebarNavItem = ({ href, icon, text }: SidebarNavItemProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!href.includes('/settings')) {
      if (window.location.pathname === href) setIsActive(true);
    } else {
      if (window.location.pathname.includes('/settings')) setIsActive(true);
    }
  }, [href]);

  return (
    <Link href={href}>
      <a
        className={`${
          isActive
            ? 'bg-slate-200 text-slate-900'
            : 'hover:bg-slate-200 hover:text-slate-900'
        }     group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
      >
        <span className="mr-4">{icon}</span>
        <span>{text}</span>
      </a>
    </Link>
  );
};

type Props = {
  children: React.ReactNode;
};

export default function DashboardShell({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-slate-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-100 focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <Cancel
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <h1 className="text-2xl font-bold text-slate-900">tin</h1>
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    <div className="px-2 space-y-1">
                      <SidebarNavItem
                        href="/dashboard"
                        icon={<Home />}
                        text="Dashboard"
                      />
                      <SidebarNavItem
                        href="/dashboard/categories"
                        icon={<BookmarkEmpty />}
                        text="Categories"
                      />
                      <SidebarNavItem
                        href="/dashboard/history"
                        icon={<Calendar />}
                        text="History"
                      />
                    </div>
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-slate-300 p-4">
                  <button className="flex items-center text-sm">
                    <LogOut className="mr-4 h-5 w-5" /> Sign out
                  </button>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-r border-slate-300 bg-slate-100">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <h1 className="text-2xl font-bold text-slate-900">tin</h1>
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="px-2 space-y-1">
                    <SidebarNavItem
                      href="/dashboard"
                      icon={<Home />}
                      text="Dashboard"
                    />
                    <SidebarNavItem
                      href="/dashboard/categories"
                      icon={<BookmarkEmpty />}
                      text="Categories"
                    />
                    <SidebarNavItem
                      href="/dashboard/history"
                      icon={<Calendar />}
                      text="History"
                    />
                  </div>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-slate-300 p-4">
                <button className="flex items-center text-sm">
                  <LogOut className="mr-4 h-5 w-5" /> Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-slate-50 border-b border-slate-200 px-4 py-1.5">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">tin</h1>
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8 bg-white">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
