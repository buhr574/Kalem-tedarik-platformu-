import { useParams, useNavigate } from "react-router-dom";
import { useOffers } from "../../context/OfferContext";
import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const OfferDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOfferById, approveOffer, rejectOffer } = useOffers();
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  const offer = getOfferById(parseInt(id));

  if (!offer) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <svg
              className="w-8 h-8 text-red-400"
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
          </div>
        </div>
        <p className="text-gray-900 dark:text-white text-xl mb-4">Teklif bulunamadı</p>
        <Button
          variant="secondary"
          onClick={() => navigate("/panel/teklifler")}
        >
          Geri Dön
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        text: "Bekliyor",
        className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
        icon: (
          <svg
            className="w-4 h-4"
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
            className="w-4 h-4"
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
            className="w-4 h-4"
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
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${badge.className}`}
      >
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  const handleApprove = async () => {
    setIsLoading(true);
    setActionMessage(null);
    const result = await approveOffer(offer.id);
    setIsLoading(false);

    if (result.success) {
      setActionMessage({ type: "success", text: "Teklif onaylandı!" });
      setTimeout(() => {
        navigate("/panel/teklifler");
      }, 1500);
    } else {
      setActionMessage({
        type: "error",
        text: result.error || "Bir hata oluştu",
      });
    }
  };

  const handleReject = async () => {
    if (!window.confirm("Bu teklifi reddetmek istediğinizden emin misiniz?")) {
      return;
    }

    setIsLoading(true);
    setActionMessage(null);
    const result = await rejectOffer(offer.id);
    setIsLoading(false);

    if (result.success) {
      setActionMessage({ type: "success", text: "Teklif reddedildi!" });
      setTimeout(() => {
        navigate("/panel/teklifler");
      }, 1500);
    } else {
      setActionMessage({
        type: "error",
        text: result.error || "Bir hata oluştu",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/panel/teklifler")}>
            ← Geri
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teklif Detayları</h1>
        </div>
        {getStatusBadge(offer.status)}
      </div>

      {actionMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            actionMessage.type === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-300"
              : "bg-red-500/20 border border-red-500/50 text-red-300"
          }`}
        >
          {actionMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={offer.itemImage}
                alt={offer.itemName}
                className="w-full md:w-64 h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400";
                }}
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {offer.itemName}
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-200">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Miktar:</span>{" "}
                    {offer.quantity}{" "}
                    {offer.currency === "TRY" ? "Adet" : "Unit"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Hedef Birim Fiyat:
                    </span>{" "}
                    {offer.targetUnitPrice.toLocaleString("tr-TR")}{" "}
                    {offer.currency}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Toplam Tutar:
                    </span>{" "}
                    {(offer.quantity * offer.targetUnitPrice).toLocaleString(
                      "tr-TR"
                    )}{" "}
                    {offer.currency}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Para Birimi:</span>{" "}
                    {offer.currency}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {offer.description && (
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Açıklama
              </h3>
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                {offer.description}
              </p>
            </Card>
          )}

          <Card>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Teklif Bilgileri
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Teklif No:</span> #
                {offer.id}
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Oluşturan:</span>{" "}
                {offer.submittedBy}
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Oluşturulma Tarihi:
                </span>{" "}
                {offer.submittedDate}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">İşlemler</h3>
            <div className="space-y-3">
              {offer.status === "pending" && (
                <>
                  <Button
                    variant="success"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleApprove}
                    disabled={isLoading}
                  >
                    <svg
                      className="w-4 h-4"
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
                    Onayla
                  </Button>
                  <Button
                    variant="danger"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleReject}
                    disabled={isLoading}
                  >
                    <svg
                      className="w-4 h-4"
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
                    Reddet
                  </Button>
                </>
              )}
              {offer.status !== "pending" && (
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Bu teklif{" "}
                  {offer.status === "approved" ? "onaylanmış" : "reddedilmiş"}{" "}
                  durumda.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
