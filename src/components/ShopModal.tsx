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
import { Droplet, Plus, Minus, ShoppingCart, CreditCard, X, Building2, Calendar, Users, Briefcase, Music, PartyPopper } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

type PurchaseType = "private" | "business" | "events";
type EventCategory = "work" | "cultural" | "party";

interface PrivateProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  sizes: { size: string; price: number }[];
}

interface BusinessProduct {
  id: string;
  name: string;
  description: string;
  type: "monthly" | "pallet";
  price: number;
  unit: string;
  minOrder?: number;
}

interface EventPackage {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  image: string;
  basePrice: number;
  includes: string[];
}

interface CartItem {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  details?: string;
}

const privateProducts: PrivateProduct[] = [
  {
    id: "pure-spring",
    name: "Pure Spring",
    description: "Untouched purity from the heart of the Alps",
    image: "/pure-spring-removebg-preview.png",
    sizes: [
      { size: "250ml", price: 2.5 },
      { size: "500ml", price: 4.5 },
      { size: "750ml", price: 6.5 },
    ],
  },
  {
    id: "sparkling-crest",
    name: "Sparkling Crest",
    description: "Natural effervescence, refined elegance",
    image: "/sparkling-crest-removebg-preview.png",
    sizes: [
      { size: "250ml", price: 2.8 },
      { size: "500ml", price: 5.0 },
      { size: "750ml", price: 7.0 },
    ],
  },
  {
    id: "alpine-burst",
    name: "Alpine Burst",
    description: "Bold personality, superior intensity",
    image: "/alpine-burst-removebg-preview.png",
    sizes: [
      { size: "250ml", price: 3.0 },
      { size: "500ml", price: 5.5 },
      { size: "750ml", price: 7.5 },
    ],
  },
];

const businessProducts: BusinessProduct[] = [
  {
    id: "monthly-furnishing",
    name: "Monthly Furnishing",
    description: "Regular monthly delivery of Alpine waters for your office",
    type: "monthly",
    price: 450,
    unit: "per month",
    minOrder: 50,
  },
  {
    id: "pallet-pure-spring",
    name: "Pallet - Pure Spring",
    description: "Bulk order of Pure Spring water",
    type: "pallet",
    price: 1200,
    unit: "per pallet (144 bottles)",
  },
  {
    id: "pallet-sparkling-crest",
    name: "Pallet - Sparkling Crest",
    description: "Bulk order of Sparkling Crest water",
    type: "pallet",
    price: 1350,
    unit: "per pallet (144 bottles)",
  },
  {
    id: "pallet-alpine-burst",
    name: "Pallet - Alpine Burst",
    description: "Bulk order of Alpine Burst water",
    type: "pallet",
    price: 1500,
    unit: "per pallet (144 bottles)",
  },
  {
    id: "mixed-pallet",
    name: "Mixed Pallet",
    description: "Custom mixed pallet with all three varieties",
    type: "pallet",
    price: 1350,
    unit: "per pallet (144 bottles)",
  },
];

const eventPackages: EventPackage[] = [
  {
    id: "work-event-basic",
    name: "Work Event - Basic",
    description: "Professional water service for corporate events",
    category: "work",
    image: "https://ext.same-assets.com/1656755911/4129149451.jpeg",
    basePrice: 250,
    includes: [
      "Water stations setup",
      "500ml bottles (50 units)",
      "Professional service staff",
      "Cleanup service",
    ],
  },
  {
    id: "work-event-premium",
    name: "Work Event - Premium",
    description: "Premium water service for important corporate gatherings",
    category: "work",
    image: "https://ext.same-assets.com/1656755911/515093026.jpeg",
    basePrice: 500,
    includes: [
      "Premium water stations",
      "750ml bottles (100 units)",
      "Dedicated service staff",
      "Branded presentation",
      "Cleanup service",
    ],
  },
  {
    id: "cultural-event-basic",
    name: "Cultural Event - Basic",
    description: "Elegant water service for cultural gatherings",
    category: "cultural",
    image: "https://ext.same-assets.com/1656755911/3649516832.jpeg",
    basePrice: 300,
    includes: [
      "Elegant water stations",
      "Glass bottles (60 units)",
      "Service staff",
      "Event coordination",
    ],
  },
  {
    id: "cultural-event-premium",
    name: "Cultural Event - Premium",
    description: "Premium water experience for cultural events",
    category: "cultural",
    image: "https://ext.same-assets.com/1656755911/2667005913.jpeg",
    basePrice: 600,
    includes: [
      "Premium water stations",
      "Glass bottles (120 units)",
      "Dedicated service team",
      "Custom branding",
      "Event coordination",
    ],
  },
  {
    id: "party-basic",
    name: "Party - Basic",
    description: "Fun water service for parties and celebrations",
    category: "party",
    image: "https://ext.same-assets.com/1656755911/4227031535.jpeg",
    basePrice: 200,
    includes: [
      "Water stations",
      "500ml bottles (40 units)",
      "Basic service",
      "Cleanup",
    ],
  },
  {
    id: "party-premium",
    name: "Party - Premium",
    description: "Premium water experience for special celebrations",
    category: "party",
    image: "https://ext.same-assets.com/1656755911/971678446.jpeg",
    basePrice: 450,
    includes: [
      "Premium water stations",
      "750ml bottles (80 units)",
      "Service staff",
      "Custom setup",
      "Cleanup service",
    ],
  },
];

interface ShopModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShopModal({ open, onOpenChange }: ShopModalProps) {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("private");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedEventCategory, setSelectedEventCategory] = useState<EventCategory | "all">("all");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchaseTypeChange = (type: PurchaseType) => {
    setPurchaseType(type);
    setCart([]);
    setSelectedProduct(null);
    setSelectedSize("");
    setQuantity(1);
    setSelectedEventCategory("all");
  };

  const addPrivateToCart = () => {
    if (!selectedProduct || !selectedSize) return;

    const product = privateProducts.find((p) => p.id === selectedProduct);
    if (!product) return;

    const sizeInfo = product.sizes.find((s) => s.size === selectedSize);
    if (!sizeInfo) return;

    const existingItem = cart.find(
      (item) => item.id === `${selectedProduct}-${selectedSize}`
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === `${selectedProduct}-${selectedSize}`
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      toast.success("Cart updated!", {
        description: `Added ${quantity} more ${product.name} (${selectedSize})`,
      });
    } else {
      setCart([
        ...cart,
        {
          id: `${selectedProduct}-${selectedSize}`,
          name: product.name,
          type: "private",
          quantity,
          price: sizeInfo.price,
          details: selectedSize,
        },
      ]);
      toast.success("Added to cart!", {
        description: `${product.name} (${selectedSize}) x${quantity}`,
      });
    }

    setSelectedProduct(null);
    setSelectedSize("");
    setQuantity(1);
  };

  const addBusinessToCart = (product: BusinessProduct) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success("Cart updated!", {
        description: `Added another ${product.name}`,
      });
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          type: "business",
          quantity: 1,
          price: product.price,
          details: product.unit,
        },
      ]);
      toast.success("Added to cart!", {
        description: product.name,
      });
    }
  };

  const addEventToCart = (eventPackage: EventPackage) => {
    const existingItem = cart.find((item) => item.id === eventPackage.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === eventPackage.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success("Cart updated!", {
        description: `Added another ${eventPackage.name}`,
      });
    } else {
      setCart([
        ...cart,
        {
          id: eventPackage.id,
          name: eventPackage.name,
          type: "event",
          quantity: 1,
          price: eventPackage.basePrice,
          details: eventPackage.category,
        },
      ]);
      toast.success("Added to cart!", {
        description: eventPackage.name,
      });
    }
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          purchaseType,
        }),
      });

      if (response.ok) {
        const { sessionId } = await response.json();
        const stripe = await stripePromise;
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId });
        }
      } else {
        toast.success("Checkout initiated!", {
          description: `Purchase Type: ${purchaseType} | Items: ${cart.length} | Total: CHF ${getTotal().toFixed(2)}`,
        });
        setCart([]);
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.success("Checkout initiated!", {
        description: `Purchase Type: ${purchaseType} | Items: ${cart.length} | Total: CHF ${getTotal().toFixed(2)}`,
      });
      setCart([]);
      onOpenChange(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredEvents = selectedEventCategory === "all"
    ? eventPackages
    : eventPackages.filter((pkg) => pkg.category === selectedEventCategory);

  const getEventIcon = (category: EventCategory) => {
    switch (category) {
      case "work":
        return <Briefcase className="w-5 h-5" />;
      case "cultural":
        return <Music className="w-5 h-5" />;
      case "party":
        return <PartyPopper className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 w-[95vw] sm:w-full">
        <div className="p-4 sm:p-6 border-b border-zinc-200">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold">
              San Bernardino Shop
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Choose your purchase type and select your preferred Alpine waters
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-4 sm:p-6">
          {/* Purchase Type Selection */}
          <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6">
            <Button
              variant={purchaseType === "private" ? "default" : "outline"}
              onClick={() => handlePurchaseTypeChange("private")}
              className="flex-1 text-xs sm:text-sm"
              size="sm"
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Private
            </Button>
            <Button
              variant={purchaseType === "business" ? "default" : "outline"}
              onClick={() => handlePurchaseTypeChange("business")}
              className="flex-1 text-xs sm:text-sm"
              size="sm"
            >
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Business
            </Button>
            <Button
              variant={purchaseType === "events" ? "default" : "outline"}
              onClick={() => handlePurchaseTypeChange("events")}
              className="flex-1 text-xs sm:text-sm"
              size="sm"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Events
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Products Section */}
            <div className="lg:col-span-2 space-y-4">
              {/* Private Purchase Type */}
              {purchaseType === "private" && (
                <>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Select Products</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {privateProducts.map((product) => (
                      <Card
                        key={product.id}
                        className={`overflow-hidden cursor-pointer transition-all ${
                          selectedProduct === product.id
                            ? "ring-2 ring-zinc-900 shadow-lg"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => {
                          setSelectedProduct(product.id);
                          setSelectedSize("");
                        }}
                      >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                        <div className="p-4">
                          <h4 className="font-bold mb-1">{product.name}</h4>
                          <p className="text-sm text-zinc-600">{product.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {selectedProduct && (
                    <Card className="p-6 mt-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden relative">
                    <Image
                      src={privateProducts.find((p) => p.id === selectedProduct)?.image || ""}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">
                            {privateProducts.find((p) => p.id === selectedProduct)?.name}
                          </h4>
                          <p className="text-sm text-zinc-600">
                            {privateProducts.find((p) => p.id === selectedProduct)?.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {privateProducts
                        .find((p) => p.id === selectedProduct)
                        ?.sizes.map((size) => (
                          <button
                            key={size.size}
                            onClick={() => setSelectedSize(size.size)}
                            className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                              selectedSize === size.size
                                ? "border-zinc-900 bg-zinc-900 text-white"
                                : "border-zinc-200 hover:border-zinc-400"
                            }`}
                          >
                            <div className="font-semibold text-sm sm:text-base">{size.size}</div>
                            <div className="text-xs mt-1">CHF {size.price.toFixed(2)}</div>
                          </button>
                        ))}
                    </div>
                        </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Quantity</label>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-base sm:text-lg font-semibold w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                        <Button onClick={addPrivateToCart} disabled={!selectedSize} className="w-full">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  )}
                </>
              )}

              {/* Business Purchase Type */}
              {purchaseType === "business" && (
                <>
                  <h3 className="text-xl font-bold mb-4">Business Solutions</h3>
                  <div className="space-y-4">
                    {businessProducts.map((product) => (
                      <Card key={product.id} className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-bold text-lg">{product.name}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                product.type === "monthly"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}>
                                {product.type === "monthly" ? "Monthly" : "Pallet"}
                              </span>
                            </div>
                            <p className="text-zinc-600 mb-3">{product.description}</p>
                            {product.minOrder && (
                              <p className="text-sm text-zinc-500">Minimum order: {product.minOrder} units</p>
                            )}
                            <div className="mt-4">
                              <span className="text-2xl font-bold">CHF {product.price.toFixed(2)}</span>
                              <span className="text-zinc-600 ml-2">{product.unit}</span>
                            </div>
                          </div>
                          <Button onClick={() => addBusinessToCart(product)}>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {/* Events Purchase Type */}
              {purchaseType === "events" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Event Packages</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedEventCategory === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedEventCategory("all")}
                      >
                        All
                      </Button>
                      <Button
                        variant={selectedEventCategory === "work" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedEventCategory("work")}
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Work
                      </Button>
                      <Button
                        variant={selectedEventCategory === "cultural" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedEventCategory("cultural")}
                      >
                        <Music className="w-4 h-4 mr-2" />
                        Cultural
                      </Button>
                      <Button
                        variant={selectedEventCategory === "party" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedEventCategory("party")}
                      >
                        <PartyPopper className="w-4 h-4 mr-2" />
                        Party
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {filteredEvents.map((eventPackage) => (
                      <Card key={eventPackage.id} className="overflow-hidden">
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={eventPackage.image}
                            alt={eventPackage.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="p-4 sm:p-6">
                          <div className="flex items-center gap-2 mb-2">
                            {getEventIcon(eventPackage.category)}
                            <h4 className="font-bold text-lg">{eventPackage.name}</h4>
                          </div>
                          <p className="text-zinc-600 mb-4">{eventPackage.description}</p>
                          <div className="mb-4">
                            <p className="text-sm font-semibold mb-2">Includes:</p>
                            <ul className="text-sm text-zinc-600 space-y-1">
                              {eventPackage.includes.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold">CHF {eventPackage.basePrice.toFixed(2)}</span>
                              <span className="text-zinc-600 ml-2 text-sm">per event</span>
                            </div>
                            <Button onClick={() => addEventToCart(eventPackage)}>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Cart Section */}
            <div className="lg:col-span-1">
              <Card className="p-4 sm:p-6 sticky top-4">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Cart</h3>
                  {cart.length > 0 && (
                    <span className="ml-auto bg-zinc-900 text-white text-xs px-2 py-1 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </div>

                {cart.length === 0 ? (
                  <p className="text-zinc-500 text-sm text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-3 mb-4">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-zinc-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{item.name}</div>
                          {item.details && (
                            <div className="text-xs text-zinc-600">{item.details}</div>
                          )}
                          <div className="text-xs text-zinc-600 mt-1">
                            {item.type === "private" ? `${item.details} × ${item.quantity}` : `Qty: ${item.quantity}`}
                          </div>
                          <div className="text-sm font-semibold mt-1">
                            CHF {(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-1 rounded hover:bg-zinc-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-1 rounded hover:bg-zinc-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="p-1 rounded hover:bg-zinc-200 ml-2"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <>
                    <div className="border-t border-zinc-200 pt-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-bold">CHF {getTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-zinc-600">
                        <span>Purchase Type</span>
                        <span className="capitalize">{purchaseType}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-zinc-900 to-zinc-700"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {isProcessing ? "Processing..." : "Checkout with Stripe"}
                    </Button>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
