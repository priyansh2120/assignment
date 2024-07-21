// app/coins/[id]/page.tsx
import CoinDetail from '../CoinDetail';

export default function CoinPage({ params }: any) {
    return <CoinDetail id={params.id} />;
}