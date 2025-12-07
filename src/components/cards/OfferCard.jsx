import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

const OfferCard = ({ offer }) => {
  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        text: "Bekliyor",
        className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
        icon: (
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      approved: {
        text: "Onaylandı",
        className: "bg-green-500/20 text-green-300 border-green-500/50",
        icon: (
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ),
      },
      rejected: {
        text: "Reddedildi",
        className: "bg-red-500/20 text-red-300 border-red-500/50",
        icon: (
          <svg
            className="w-3 h-3"
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
        ),
      },
    };

    const badge = badges[status] || badges.pending;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}
      >
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  return (
    <Card className="transition-all duration-500 ease-in-out">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <img
            src={offer.itemImage}
            alt={offer.itemName}
            className="w-full md:w-32 h-32 object-cover rounded-lg"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400";
            }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold text-white">
                {offer.itemName}
              </h3>
              {getStatusBadge(offer.status)}
            </div>
            <div className="text-gray-300 text-sm space-y-1">
              <p>
                <span className="font-medium">{offer.quantity}</span>{" "}
                {offer.currency === "TRY" ? "Adet" : "Unit"}
              </p>
              <p>
                <span className="font-medium">
                  {offer.targetUnitPrice.toLocaleString("tr-TR")}
                </span>{" "}
                {offer.currency} (Hedef)
              </p>
              <p className="text-gray-400 text-xs mt-2">
                {offer.submittedBy} • {offer.submittedDate}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link to={`/panel/teklifler/${offer.id}`}>
              <Button
                variant="secondary"
                size="sm"
                className="w-full md:w-auto"
              >
                Detayları Gör
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OfferCard;
