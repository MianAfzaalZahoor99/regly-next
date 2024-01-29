import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Regly - KYC & AML Solution',
};

export default function HomePage() {
  return <JwtLoginView />;
}
