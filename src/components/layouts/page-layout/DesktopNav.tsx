
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
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
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
    <nav className="hidden lg:flex items-center bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/15 shadow-lg shadow-white/5">
      <NavigationMenu>
        <NavigationMenuList>
          {mainNav.map((item) => (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.path}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent rounded-full',
                    isActive(item.path)
                      ? 'bg-white/15 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(
              "bg-transparent text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300",
              "data-[state=open]:bg-white/10 data-[state=open]:backdrop-blur-md data-[state=open]:border data-[state=open]:border-white/20",
              "data-[state=open]:shadow-lg data-[state=open]:shadow-white/10"
            )}>
              Tentang
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
