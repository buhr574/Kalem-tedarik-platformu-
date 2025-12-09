import Card from "../ui/Card";
import Button from "../ui/Button";

const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <Card className="transition-all duration-500 ease-in-out hover:shadow-2xl">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="relative mb-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg border border-white/5"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400";
              }}
            />
            <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-xs font-medium bg-black/60 backdrop-blur-sm text-white border border-white/10">
              {item.category}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
        <p className="text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-gray-400 dark:text-gray-300 text-gray-600 dark:text-gray-300 text-sm">
            Birim:{" "}
            <span className="text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 font-medium">{item.unit}</span>
          </span>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(item)}
                className="text-xs"
              >
                Düzenle
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(item.id)}
                className="text-xs"
              >
                Sil
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
