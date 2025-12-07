import Card from "../ui/Card";
import Button from "../ui/Button";

const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <Card className="transition-all duration-500 ease-in-out">
      <div className="flex flex-col">
        <div className="mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg mb-3"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400";
            }}
          />
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/50">
            {item.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-gray-400 text-sm">Birim: {item.unit}</span>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(item)}
              >
                Düzenle
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(item.id)}
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
