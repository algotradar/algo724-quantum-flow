
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptoPrices } from '@/lib/api';

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
