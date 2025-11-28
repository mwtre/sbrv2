"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Wallet,
  Droplet,
  Coins,
  TrendingUp,
  Lock,
  Zap,
  Gift,
  Users,
  BarChart3,
  Bitcoin,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type TabType = "nft-shop" | "staking" | "reserve";

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  attributes: {
    purity: number;
    source: string;
    vintage: string;
  };
}

interface StakingPool {
  id: string;
  name: string;
  apy: number;
  minStake: number;
  totalStaked: number;
  lockPeriod: number;
  description: string;
}

interface Web3ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const waterNFTs: NFT[] = [
  {
    id: "nft-1",
    name: "Alpine Spring #001",
    description: "First edition Pure Spring NFT from the source",
    image: "https://ext.same-assets.com/1656755911/4227031535.jpeg",
    price: 0.5,
    rarity: "legendary",
    attributes: {
      purity: 99.9,
      source: "Alpine Spring",
      vintage: "2024",
    },
  },
  {
    id: "nft-2",
    name: "Sparkling Crest #042",
    description: "Rare Sparkling Crest collection piece",
    image: "https://ext.same-assets.com/1656755911/971678446.jpeg",
    price: 0.3,
    rarity: "epic",
    attributes: {
      purity: 99.7,
      source: "Mountain Source",
      vintage: "2024",
    },
  },
  {
    id: "nft-3",
    name: "Alpine Burst #128",
    description: "Epic Alpine Burst water NFT",
    image: "https://ext.same-assets.com/1656755911/1577364574.jpeg",
    price: 0.2,
    rarity: "rare",
    attributes: {
      purity: 99.5,
      source: "Glacier Spring",
      vintage: "2024",
    },
  },
  {
    id: "nft-4",
    name: "Pure Spring #256",
    description: "Common Pure Spring NFT",
    image: "https://ext.same-assets.com/1656755911/4227031535.jpeg",
    price: 0.1,
    rarity: "common",
    attributes: {
      purity: 99.0,
      source: "Alpine Spring",
      vintage: "2024",
    },
  },
  {
    id: "nft-5",
    name: "Mountain Source #512",
    description: "Rare mountain source collection",
    image: "https://ext.same-assets.com/1656755911/515093026.jpeg",
    price: 0.25,
    rarity: "rare",
    attributes: {
      purity: 99.6,
      source: "Mountain Peak",
      vintage: "2024",
    },
  },
  {
    id: "nft-6",
    name: "Glacier Pure #1024",
    description: "Epic glacier water NFT",
    image: "https://ext.same-assets.com/1656755911/3649516832.jpeg",
    price: 0.35,
    rarity: "epic",
    attributes: {
      purity: 99.8,
      source: "Glacier",
      vintage: "2024",
    },
  },
];

const stakingPools: StakingPool[] = [
  {
    id: "pool-1",
    name: "Alpine Water Staking Pool",
    apy: 12.5,
    minStake: 0.1,
    totalStaked: 1250.5,
    lockPeriod: 30,
    description: "Stake your Water NFTs to earn BTC rewards",
  },
  {
    id: "pool-2",
    name: "Premium Spring Pool",
    apy: 18.0,
    minStake: 0.5,
    totalStaked: 850.2,
    lockPeriod: 90,
    description: "Higher APY for longer lock periods",
  },
  {
    id: "pool-3",
    name: "Glacier Reserve Pool",
    apy: 25.0,
    minStake: 1.0,
    totalStaked: 2100.8,
    lockPeriod: 180,
    description: "Maximum rewards for committed stakers",
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "epic":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "rare":
      return "bg-blue-100 text-blue-800 border-blue-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export default function Web3Modal({ open, onOpenChange }: Web3ModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("nft-shop");
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = () => {
    // In a real app, this would connect to a Web3 wallet
    setIsConnected(true);
    toast.success("Wallet connected!", {
      description: "Demo mode - Ready to interact with Web3 features",
    });
  };

  const handleBuyNFT = (nft: NFT) => {
    if (!isConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet first",
      });
      return;
    }
    toast.success("NFT Purchase Initiated!", {
      description: `Purchasing ${nft.name} for ${nft.price} BTC`,
    });
  };

  const handleStake = (pool: StakingPool) => {
    if (!isConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet first",
      });
      return;
    }
    if (!stakeAmount || parseFloat(stakeAmount) < pool.minStake) {
      toast.error("Invalid stake amount", {
        description: `Minimum stake amount: ${pool.minStake} BTC`,
      });
      return;
    }
    toast.success("Staking Initiated!", {
      description: `Staking ${stakeAmount} BTC in ${pool.name} | APY: ${pool.apy}% | Lock: ${pool.lockPeriod} days`,
    });
    setStakeAmount("");
    setSelectedPool(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 w-[95vw] sm:w-full">
        <div className="p-4 sm:p-6 border-b border-zinc-200 bg-gradient-to-r from-zinc-900 to-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <Bitcoin className="w-6 h-6 sm:w-8 sm:h-8" />
              San Bernardino Web3
            </DialogTitle>
            <DialogDescription className="text-zinc-300 text-sm sm:text-base">
              Water NFTs, BTC Staking, and Global Reserve
            </DialogDescription>
          </DialogHeader>
          {!isConnected && (
            <div className="mt-4">
              <Button onClick={handleConnectWallet} variant="outline" className="border-white text-white hover:bg-white hover:text-zinc-900">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          )}
          {isConnected && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Wallet Connected</span>
            </div>
          )}
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-4 sm:p-6">
          {/* Tab Navigation */}
          <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 border-b border-zinc-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("nft-shop")}
              className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold border-b-2 transition-colors text-sm sm:text-base whitespace-nowrap ${
                activeTab === "nft-shop"
                  ? "border-zinc-900 text-zinc-900"
                  : "border-transparent text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Water NFT Shop
            </button>
            <button
              onClick={() => setActiveTab("staking")}
              className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold border-b-2 transition-colors text-sm sm:text-base whitespace-nowrap ${
                activeTab === "staking"
                  ? "border-zinc-900 text-zinc-900"
                  : "border-transparent text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />
              BTC NFT Staking Pool
            </button>
            <button
              onClick={() => setActiveTab("reserve")}
              className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold border-b-2 transition-colors text-sm sm:text-base whitespace-nowrap ${
                activeTab === "reserve"
                  ? "border-zinc-900 text-zinc-900"
                  : "border-transparent text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              BTC Global Reserve
            </button>
          </div>

          {/* NFT Shop Tab */}
          {activeTab === "nft-shop" && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Water NFT Collection</h3>
                <p className="text-zinc-600">
                  Own unique digital representations of Alpine water sources. Each NFT represents
                  a verified source with unique attributes and rarity.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {waterNFTs.map((nft) => (
                  <Card
                    key={nft.id}
                    className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                      selectedNFT === nft.id ? "ring-2 ring-zinc-900" : ""
                    }`}
                    onClick={() => setSelectedNFT(nft.id)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRarityColor(
                            nft.rarity
                          )}`}
                        >
                          {nft.rarity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-1">{nft.name}</h4>
                      <p className="text-sm text-zinc-600 mb-3">{nft.description}</p>
                      <div className="space-y-1 mb-3 text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Purity:</span>
                          <span className="font-semibold">{nft.attributes.purity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Source:</span>
                          <span className="font-semibold">{nft.attributes.source}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Vintage:</span>
                          <span className="font-semibold">{nft.attributes.vintage}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">{nft.price} BTC</div>
                          <div className="text-xs text-zinc-500">≈ ${(nft.price * 65000).toFixed(2)}</div>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyNFT(nft);
                          }}
                          disabled={!isConnected}
                          size="sm"
                        >
                          <Gift className="w-4 h-4 mr-2" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Staking Pool Tab */}
          {activeTab === "staking" && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">BTC NFT Staking Pools</h3>
                <p className="text-zinc-600">
                  Stake your Water NFTs to earn BTC rewards. Higher APY for longer lock periods.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {stakingPools.map((pool) => (
                  <Card
                    key={pool.id}
                    className={`p-6 transition-all hover:shadow-lg ${
                      selectedPool === pool.id ? "ring-2 ring-zinc-900" : ""
                    }`}
                    onClick={() => {
                      setSelectedPool(pool.id);
                      setStakeAmount("");
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg">{pool.name}</h4>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-zinc-600 mb-4">{pool.description}</p>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-600">APY</span>
                        <span className="text-2xl font-bold text-green-600">{pool.apy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-600">Min Stake</span>
                        <span className="font-semibold">{pool.minStake} BTC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-600">Total Staked</span>
                        <span className="font-semibold">{pool.totalStaked.toFixed(1)} BTC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-600">Lock Period</span>
                        <span className="font-semibold">{pool.lockPeriod} days</span>
                      </div>
                    </div>
                    {selectedPool === pool.id && (
                      <div className="mt-4 pt-4 border-t border-zinc-200">
                        <div className="mb-3">
                          <label className="text-sm font-medium mb-2 block">Stake Amount (BTC)</label>
                          <input
                            type="number"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            placeholder={`Min: ${pool.minStake} BTC`}
                            min={pool.minStake}
                            step="0.01"
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                          />
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStake(pool);
                          }}
                          disabled={!isConnected || !stakeAmount || parseFloat(stakeAmount) < pool.minStake}
                          className="w-full"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Stake Now
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Global Reserve Tab */}
          {activeTab === "reserve" && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">BTC Global Reserve</h3>
                <p className="text-zinc-600">
                  Track the global Bitcoin reserve backed by San Bernardino Alpine Waters.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bitcoin className="w-8 h-8 text-orange-500" />
                    <div>
                      <h4 className="font-bold text-lg">Total Reserve</h4>
                      <p className="text-sm text-zinc-600">BTC held in reserve</p>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">2,847.32 BTC</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +12.5% this month
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Droplet className="w-8 h-8 text-blue-500" />
                    <div>
                      <h4 className="font-bold text-lg">Water Backing</h4>
                      <p className="text-sm text-zinc-600">Liters of water per BTC</p>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">1,250 L</div>
                  <div className="text-sm text-zinc-600">Per BTC token</div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-purple-500" />
                    <div>
                      <h4 className="font-bold text-lg">Reserve Participants</h4>
                      <p className="text-sm text-zinc-600">Active contributors</p>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">1,247</div>
                  <div className="text-sm text-zinc-600">Active wallets</div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    <div>
                      <h4 className="font-bold text-lg">Reserve Growth</h4>
                      <p className="text-sm text-zinc-600">Monthly increase</p>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">+18.2%</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Last 30 days
                  </div>
                </Card>
              </div>

              <Card className="p-6 mt-6">
                <h4 className="font-bold text-lg mb-4">Reserve Statistics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">Total Value</div>
                    <div className="text-2xl font-bold">$185,075,800</div>
                    <div className="text-xs text-zinc-500 mt-1">USD equivalent</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">Average Holding</div>
                    <div className="text-2xl font-bold">2.28 BTC</div>
                    <div className="text-xs text-zinc-500 mt-1">Per participant</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 mb-1">Reserve Ratio</div>
                    <div className="text-2xl font-bold">1:1.25</div>
                    <div className="text-xs text-zinc-500 mt-1">BTC to Water</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 mt-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
                <div className="flex items-start gap-4">
                  <Coins className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">How the Reserve Works</h4>
                    <p className="text-zinc-700 mb-3">
                      The BTC Global Reserve is backed by verified Alpine water sources. Each BTC in the
                      reserve represents a claim to 1,250 liters of pristine Alpine water from our protected sources.
                    </p>
                    <ul className="text-sm text-zinc-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2"></span>
                        <span>Reserve is audited monthly by independent third parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2"></span>
                        <span>Water sources are verified and protected in perpetuity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2"></span>
                        <span>Reserve participants can redeem BTC for physical water delivery</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

