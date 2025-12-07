import { useState } from "react";
import { useItems } from "../../context/ItemContext";
import ItemCard from "../../components/cards/ItemCard";
import Modal from "../../components/ui/Modal";
import ItemForm from "../../components/forms/ItemForm";
import Button from "../../components/ui/Button";

const ItemList = () => {
  const { items, isLoading, createItem, updateItem, deleteItem } = useItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kalemi silmek istediğinizden emin misiniz?")) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    const result = await deleteItem(id);
    setIsSubmitting(false);

    if (result.success) {
      setMessage({ type: "success", text: "Kalem başarıyla silindi!" });
    } else {
      setMessage({ type: "error", text: result.error || "Bir hata oluştu" });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setMessage(null);

    let result;
    if (editingItem) {
      result = await updateItem(editingItem.id, formData);
    } else {
      result = await createItem(formData);
    }

    setIsSubmitting(false);

    if (result.success) {
      setMessage({
        type: "success",
        text: `Kalem ${editingItem ? "güncellendi" : "oluşturuldu"}!`,
      });
      setIsModalOpen(false);
      setEditingItem(null);
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error || "Bir hata oluştu" });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  if (isLoading) {
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
          Alım Kalemleri
        </h1>
        <Button variant="primary" onClick={handleCreate}>
          + Yeni Kalem Ekle
        </Button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-300"
              : "bg-red-500/20 border border-red-500/50 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {items.length === 0 ? (
        <div className="glass-card text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <svg
                className="w-8 h-8 text-purple-400"
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
          <p className="text-gray-400 text-lg mb-4">
            Henüz alım kalemi eklenmemiş
          </p>
          <Button variant="primary" onClick={handleCreate}>
            İlk Kalemi Ekle
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingItem ? "Kalem Düzenle" : "Yeni Kalem Ekle"}
        size="lg"
      >
        <ItemForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default ItemList;
