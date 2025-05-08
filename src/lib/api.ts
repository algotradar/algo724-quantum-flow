// Utility functions for API calls

export const fetchCryptoPrices = async () => {
  try {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
    const responses = await Promise.all(
      symbols.map(symbol => 
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
          .then(res => res.json())
      )
    );
    
    // Format the response data
    return responses.reduce((acc, item) => {
      const symbol = item.symbol.replace('USDT', '');
      acc[symbol] = parseFloat(item.price);
      return acc;
    }, {} as Record<string, number>);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return {
      BTC: 0,
      ETH: 0,
      SOL: 0
    };
  }
};

export const fetchBinance24hTicker = async () => {
  try {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
    const responses = await Promise.all(
      symbols.map(symbol =>
        fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
          .then(res => res.json())
      )
    );
    // Format the response data
    return responses.reduce((acc, item) => {
      const symbol = item.symbol.replace('USDT', '');
      acc[symbol] = {
        high: parseFloat(item.highPrice),
        low: parseFloat(item.lowPrice),
        volume: parseFloat(item.volume),
      };
      return acc;
    }, {} as Record<string, { high: number; low: number; volume: number }>);
  } catch (error) {
    console.error('Error fetching Binance 24h ticker:', error);
    return {
      BTC: { high: 0, low: 0, volume: 0 },
      ETH: { high: 0, low: 0, volume: 0 },
      SOL: { high: 0, low: 0, volume: 0 },
    };
  }
};
