
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NavItem } from './types';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'flex items-center select-none rounded-lg px-4 py-3 no-underline outline-none transition-colors duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.05)] focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex-grow"> {/* Wrapper for text content */}
            <div className="m-0 font-semibold text-white text-sm leading-none">{title}</div>
            <p className="m-0 text-[0.85rem] text-[#a0a0b0] line-clamp-2 leading-snug mt-0.5"> {/* Adjusted to mt-0.5 for smaller gap, text styles updated */}
              {children}
            </p>
          </div>
          {/* Icon would go here if it were a separate element, and 'a' would also get 'justify-between' */}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

interface DesktopNavProps {
  mainNav: NavItem[];
  infoNav: NavItem[];
  ctaNav?: NavItem;
  isActive: (path: string) => boolean;
  handleNavClick: (item: NavItem) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ mainNav, infoNav, ctaNav, isActive, handleNavClick }) => {
  const navigate = useNavigate();

  return (
    <nav className="hidden lg:flex items-center bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
      <NavigationMenu>
        <NavigationMenuList>
          {mainNav.map((item) => (
            <NavigationMenuItem key={item.path}>
              <Link to={item.path}>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), 'bg-transparent', isActive(item.path) ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10')}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className={cn(
              "bg-transparent text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300",
              "data-[state=open]:bg-white/10 data-[state=open]:backdrop-blur-md data-[state=open]:border data-[state=open]:border-white/20",
              "data-[state=open]:shadow-lg data-[state=open]:shadow-white/10"
            )}>
              Tentang
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute top-full left-0 mt-[10px] bg-[rgba(35,35,45,0.6)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] min-w-[300px] z-[1000]">
              <ul className="grid gap-3 p-4 md:grid-cols-2 ">
                {infoNav.map((item) => (
                  <ListItem
                    key={item.name}
                    href={item.path}
                    title={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {ctaNav && (
             <NavigationMenuItem>
                <button
                  onClick={() => handleNavClick(ctaNav)}
                  className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 relative bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 ml-2"
                >
                  {ctaNav.name}
                </button>
              </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
