type NavigationItem = { path?: string; text: string; icon?: string; items?: NavigationItem[] };
export const navigation: NavigationItem[] = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile',
      },
      {
        text: 'Tasks',
        path: '/tasks',
      },
    ],
  },
  {
    text: 'NF-e',
    icon: 'folder',
    items: [
      {
        text: 'Documentos',
        path: '/nfe/documentos',
      },
      {
        text: 'Clientes',
        path: '/nfe/clientes',
      }
    ]
  }
];
