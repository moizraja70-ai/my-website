import React, { useState } from 'react';
import { Clock, Flame, Crown, Check } from 'lucide-react';

interface SubscriptionPlansProps {
  onSelectPlan: (plan: string) => void;
  compact?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Plan data                                                          */
/* ------------------------------------------------------------------ */

interface Plan {
  id: string;
  duration: string;
  price: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  popular: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: '2-months',
    duration: '2 Months',
    price: '2,000',
    icon: Clock,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    features: [],
  },
  {
    id: '4-months',
    duration: '4 Months',
    price: '3,500',
    icon: Flame,
    color: 'from-purple-500 to-pink-500',
    popular: true,
    features: [],
  },
  {
    id: '6-months',
    duration: '6 Months',
    price: '5,000',
    icon: Crown,
    color: 'from-amber-400 to-orange-500',
    popular: false,
    features: [],
  },
];

/* ------------------------------------------------------------------ */
/*  Payment Confirmation Modal                                         */
/* ------------------------------------------------------------------ */

interface PaymentModalProps {
  plan: Plan;
  onClose: () => void;
  onConfirm: () => void;
}

const PaymentConfirmationModal: React.FC<PaymentModalProps> = ({
  plan,
  onClose,
  onConfirm,
}) => {
  if (!plan) return null;

  const PlanIcon = plan.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <svg
            className="w-5 h-5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
          >
            <PlanIcon className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Complete Your Purchase</h3>
          <p className="text-slate-600 dark:text-slate-400">
            To activate your{' '}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {plan.duration}
            </span>{' '}
            subscription, please follow these steps:
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 - Payment */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="font-semibold">Send Payment</h4>
            </div>
            <div className="space-y-2 text-sm pl-11">
              <div className="flex justify-between">
                <span className="text-slate-500">Bank:</span>
                <span className="font-medium font-mono select-all">
                  [BANK NAME]
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account Title:</span>
                <span className="font-medium font-mono select-all">
                  [ACCOUNT TITLE]
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account No:</span>
                <span className="font-medium font-mono select-all text-purple-600 dark:text-purple-400">
                  [0000-0000-0000-0000]
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Amount:</span>
                <span className="text-lg font-bold">PKR {plan.price}</span>
              </div>
            </div>
          </div>

          {/* Step 2 - Send Proof */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="font-semibold">Send Proof</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 pl-11 mb-3">
              Take a screenshot of the transaction and send it to our Admin via
              WhatsApp.
              <span className="block mt-2 font-bold text-amber-600 dark:text-amber-400">
                Your account will be activated MANUALLY after verification
                (usually within 1 hour).
              </span>
            </p>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors ml-11"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.6 1.967.3 4.54 1.489 6.208l-1.015 3.684zm11.239-5.188c-.689-.356-3.881-1.916-4.226-2.093-.345-.177-.662-.232-.904.143-.241.375-1.285 1.598-1.587 1.916-.302.318-.604.356-1.293.036-.688-.319-2.607-1.125-4.723-3.033-1.666-1.503-2.327-3.033-2.613-3.463-.286-.431-.19-.714-.005-1.077.17-.333.376-.554.568-.795.191-.24.254-.406.381-.661.127-.255.064-.479-.032-.672-.096-.193-.905-2.18-.946-2.227-.376-.431-.776-.367-1.047-.356-.271.012-.583.036-.895.036-.312 0-.82.118-1.248.586-.427.468-1.631 1.593-1.631 3.886 0 2.293 1.672 4.509 1.903 4.819.232.31 3.284 5.013 7.955 7.031 3.324 1.436 4.607 1.151 5.437 1.072 1.428-.135 3.33-1.365 3.799-2.682.469-1.317.469-2.443.328-2.682-.141-.239-.531-.383-1.219-.728z" />
              </svg>
              Share Proof on WhatsApp
            </a>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            I Have Paid
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Plan Card (shared between compact and full-page views)             */
/* ------------------------------------------------------------------ */

interface PlanCardProps {
  plan: Plan;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  index,
  isSelected,
  onSelect,
}) => {
  const PlanIcon = plan.icon;

  return (
    <div
      onClick={() => onSelect(plan.id)}
      className="relative group rounded-3xl p-1 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
      />
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.color} opacity-0 ${
          isSelected ? 'opacity-100' : 'group-hover:opacity-100'
        } transition-opacity duration-300`}
      />

      {/* Card content */}
      <div className="relative h-full bg-white dark:bg-slate-900 rounded-[22px] p-8 flex flex-col items-center border border-slate-200 dark:border-slate-800 hover:border-transparent transition-colors duration-300">
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute -top-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg transform -translate-y-1 group-hover:-translate-y-2 transition-transform duration-300">
            MOST POPULAR
          </div>
        )}

        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
        >
          <PlanIcon className="w-8 h-8" />
        </div>

        {/* Duration */}
        <h3 className="text-2xl font-bold mb-2">{plan.duration}</h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            PKR
          </span>
          <span className="text-4xl font-bold tracking-tight">
            {plan.price}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-4 w-full mb-8 flex-1">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`mt-1 p-0.5 rounded-full bg-gradient-to-br ${plan.color}`}
              >
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-slate-600 dark:text-slate-300 text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Select button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(plan.id);
          }}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform active:scale-95 bg-gradient-to-r ${plan.color} hover:brightness-110 hover:shadow-xl`}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  onSelectPlan,
  compact,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? null;

  const handleSelectPlan = (id: string) => {
    setSelectedPlanId(id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selectedPlanId) {
      onSelectPlan(selectedPlanId);
      setShowModal(false);
    }
  };

  /* ---- Compact mode (inline cards, no wrapper chrome) ---- */
  if (compact) {
    return (
      <>
        {showModal && selectedPlan && (
          <PaymentConfirmationModal
            plan={selectedPlan}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirm}
          />
        )}
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            index={index}
            isSelected={selectedPlanId === plan.id}
            onSelect={handleSelectPlan}
          />
        ))}
      </>
    );
  }

  /* ---- Full-page mode ---- */
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white py-20 px-4 transition-colors duration-300">
      {showModal && selectedPlan && (
        <PaymentConfirmationModal
          plan={selectedPlan}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Choose Your Success Path
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Unlock the full potential of your exam preparation with our premium
            plans tailored to your timeline.
          </p>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={index}
              isSelected={selectedPlanId === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 dark:text-slate-500 mt-12 text-sm">
          All plans include a 7-day money-back guarantee. Secure payment
          processed via Stripe/local gateways.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
