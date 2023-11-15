import Cookies from 'js-cookie';
import Navbar from './navbar';

export default async function Nav() {
  const userJson = Cookies.get('user');

  if (!userJson) return;

  const user = JSON.parse(userJson);

  return <Navbar user={user} />;
}
