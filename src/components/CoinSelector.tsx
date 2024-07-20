import { useState } from 'react';

const CoinSelector = ({ coins, onSelect }: { coins: string[], onSelect: (selected: string[]) => void }) => {
    const [selectedCoins, setSelectedCoins] = useState<string[]>([]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        if (selectedOptions.length <= 3) {
            setSelectedCoins(selectedOptions);
            onSelect(selectedOptions);
        }
    };

    return (
        <div>
            <select multiple value={selectedCoins} onChange={handleSelect}>
                {coins.map(coin => (
                    <option key={coin} value={coin}>{coin}</option>
                ))}
            </select>
        </div>
    );
};

export default CoinSelector;
