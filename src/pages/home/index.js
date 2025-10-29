import { initThemeSwitcher } from '@/features/theme-switcher';
import { THEMES } from '@/features/theme-switcher/constants';

initThemeSwitcher({
  root: document.body,
  node: document.querySelector('button'),
  themeList: THEMES,
});
