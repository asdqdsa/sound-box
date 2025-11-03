import { THEMES } from '@/features/theme-switcher/constants';
import { events } from '@/shared/event/event-broker';

import { loadThemeState, updateThemeState } from './state';

function nextThemeSwitcher({ themeList, currentTheme }) {
  return themeList[(themeList.indexOf(currentTheme) + 1) % themeList.length];
}

export function initThemeSwitcher({ root }) {
  const { activeTheme } = loadThemeState();
  root.dataset.theme = activeTheme;

  events.on('theme:next', () => {
    const { activeTheme } = loadThemeState();
    const next = nextThemeSwitcher({
      themeList: THEMES,
      currentTheme: activeTheme,
    });

    root.dataset.theme = next;
    updateThemeState({ activeTheme: next });
  });
}
