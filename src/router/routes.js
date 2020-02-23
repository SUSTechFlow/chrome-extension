import PageIndex from '../pages/Index';
import Comment from '../pages/Comment';

export default [
  {
    path: '/',
    component: PageIndex,
  },
  {
    path: '/comment',
    component: Comment,
  },
  {
    path: '/gpa',
    component: null,
  },
];
