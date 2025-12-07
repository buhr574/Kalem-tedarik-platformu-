import { Link } from "react-router-dom";
import { useOffers } from "../../context/OfferContext";
import { useItems } from "../../context/ItemContext";
import { useMemo } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const Dashboard = () => {
  const { offers, isLoading: offersLoading } = useOffers();
  const { items, isLoading: itemsLoading } = useItems();

  const stats = useMemo(() => {
    return {
      totalOffers: offers.length,
      pending: offers.filter((o) => o.status === "pending").length,
      approved: offers.filter((o) => o.status === "approved").length,
      totalItems: items.length,
    };
  }, [offers, items]);

  const recentOffers = useMemo(() => {
    return [...offers]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [offers]);

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
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${badge.className}`}
      >
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  if (offersLoading || itemsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
          Genel Bakış
        </h1>
        <Link to="/panel/teklifler/yeni">
          <Button variant="primary">+ Yeni Teklif Talebi</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Toplam Teklif</p>
              <p className="text-3xl font-bold text-white">
                {stats.totalOffers}
              </p>
            </div>
            <div className="w-14 h-14 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <svg
                className="w-7 h-7 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Bekleyen</p>
              <p className="text-3xl font-bold text-yellow-400">
                {stats.pending}
              </p>
            </div>
            <div className="w-14 h-14 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
              <svg
                className="w-7 h-7 text-yellow-400"
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
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Onaylanan</p>
              <p className="text-3xl font-bold text-green-400">
                {stats.approved}
              </p>
            </div>
            <div className="w-14 h-14 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <svg
                className="w-7 h-7 text-green-400"
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
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Toplam Kalem</p>
              <p className="text-3xl font-bold text-purple-400">
                {stats.totalItems}
              </p>
            </div>
            <div className="w-14 h-14 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <svg
                className="w-7 h-7 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teklif Durum Analizi */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">
            Teklif Durum Analizi
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-300">Bekleyen</span>
              </div>
              <span className="text-white font-semibold">{stats.pending}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    stats.totalOffers > 0
                      ? (stats.pending / stats.totalOffers) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-300">Onaylanan</span>
              </div>
              <span className="text-white font-semibold">{stats.approved}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    stats.totalOffers > 0
                      ? (stats.approved / stats.totalOffers) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-300">Toplam</span>
              </div>
              <span className="text-white font-semibold">
                {stats.totalOffers}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: "100%",
                }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Son Aktiviteler */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">
            Son Aktiviteler
          </h2>
          {recentOffers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>Henüz aktivite yok</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOffers.map((offer) => (
                <Link
                  key={offer.id}
                  to={`/panel/teklifler/${offer.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      Talep #{offer.id}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {offer.submittedDate}
                    </p>
                  </div>
                  <div className="ml-4">{getStatusBadge(offer.status)}</div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
