import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptoPrices, fetchBinance24hTicker } from '@/lib/api';

export const useCryptoPrices = () => {
  const { data: prices, isLoading, error, refetch } = useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Format prices with proper formatting
  const formattedPrices = {
    BTC: prices?.BTC ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(prices.BTC) : '$0',
    ETH: prices?.ETH ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(prices.ETH) : '$0',
    SOL: prices?.SOL ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(prices.SOL) : '$0',
  };

  return { prices, formattedPrices, isLoading, error, refetch };
};

export const useBinance24hTicker = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['binance24hTicker'],
    queryFn: fetchBinance24hTicker,
    refetchInterval: 30000,
  });

  // Format values for display
  const formatted = data
    ? {
        BTC: {
          high: data.BTC.high.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          low: data.BTC.low.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          volume: data.BTC.volume.toLocaleString('en-US'),
        },
        ETH: {
          high: data.ETH.high.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          low: data.ETH.low.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          volume: data.ETH.volume.toLocaleString('en-US'),
        },
        SOL: {
          high: data.SOL.high.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          low: data.SOL.low.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          volume: data.SOL.volume.toLocaleString('en-US'),
        },
      }
    : undefined;

  return { data, formatted, isLoading, error, refetch };
};
