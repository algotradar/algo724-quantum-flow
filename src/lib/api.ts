
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
