import json
import datetime

# Function from previous step, kept for context if needed, but not run by default
def create_new_announcement_at_beginning():
    new_announcement_data = {
        "title": "Update v3.7: Fitur Unggah Karya (V2 - Prepend)",
        "content": "WUJUDKAN KARYAMU!\n\nUpdate Terbaru\n11 April 2025\nApa yang Baru?\nAda pembaruan seru di website kita! Dengan Update v3.7, kini giliran kamu untuk berbagi dan mewujudkan karya kerenmu langsung melalui OurCreativity!\n\nFitur \"Unggah Karya\" Spesial Buat Kamu!\n\nYang Kamu Bisa Lakukan:\nPamerkan Kreasimu: Sekarang kamu bisa unggah Gambar, Video, atau Tulisan karyamu sendiri\n\nGampang Banget: Cari tombol \"Unggah Karya\" (ada di header atau halaman Karya Kami)\n\nPilih Jenis Karyamu: Ada pilihan untuk Gambar (JPG, PNG, WebP, GIF - maks 1MB), Video (MP4, WebM, OGG - maks 50MB), atau Tulisan\n\nBagaimana Caranya?\n1. Klik tombol \"Unggah Karya\"\n\n2. Isi detail singkat: Judul, Namamu, Kategori (Desain, Video, Tulisan, Meme)\n\n3. Unggah file gambar (maks 1MB) atau video (maks 50MB)\n\n4. Klik Kirim!\n\nProses Seleksi & Tampil Karya\n• Karya yang kamu kirim akan ditinjau oleh tim admin\n\n• Kami akan melakukan seleksi berdasarkan kriteria seperti orisinalitas, kualitas, dan kesesuaian\n\n• Karya-karya terpilih akan kami umumkan dan tampilkan di galeri Karya Kami dalam update mingguan\n\nIngat Aturan Mainnya Ya:\n• Pastikan karya itu buatanmu sendiri atau kamu punya izin jelas untuk membagikannya\n\n• Hargai hak cipta orang lain. Dilarang keras mengunggah karya milik orang lain tanpa izin\n\n• Jaga konten tetap sopan dan positif (tidak mengandung SARA, kekerasan, dll)\n\n• Patuhi batas ukuran file (Gambar 1MB, Video 50MB)\n\nKami nggak sabar melihat karya-karya hebat dari kalian! Yuk, segera coba fitur barunya dan WUJUDKAN KARYAMU di galeri OurCreativity! 🔥\n\nSalam Kreatif,\nTim OurCreativity",
        "category": "update",
        "date": "2025-04-11T00:00:00.000Z", # This was already set correctly
        "important": True,
        "published": True,
        "image_url": None,
        "link_url": None
    }

    try:
        with open("announcements.json", "r") as f:
            announcements_list = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        announcements_list = []

    new_id = 1
    if announcements_list:
        max_id = 0
        for ann in announcements_list:
            try:
                current_id = int(ann.get("id", 0))
                if current_id > max_id:
                    max_id = current_id
            except ValueError:
                pass
        new_id = max_id + 1

    new_announcement_data["id"] = str(new_id)
    # new_announcement_data["created_at"] = datetime.datetime.utcnow().isoformat() + "Z" # Original dynamic creation
    new_announcement_data["created_at"] = "2025-04-11T00:00:00.000Z" # Specific requirement for this subtask

    announcements_list.insert(0, new_announcement_data)

    with open("announcements.json", "w") as f:
        json.dump(announcements_list, f, indent=2)

    print(f"New announcement with ID {new_id} added to the beginning with specific created_at.")


def update_latest_announcement_timestamps(target_id="6", new_date="2025-04-11T00:00:00.000Z", new_created_at="2025-04-11T00:00:00.000Z"):
    try:
        with open("announcements.json", "r") as f:
            announcements_list = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        print("Error: announcements.json not found or is corrupted.")
        return

    updated = False
    for announcement in announcements_list:
        if announcement.get("id") == target_id:
            announcement["date"] = new_date
            announcement["created_at"] = new_created_at
            updated = True
            print(f"Announcement with ID {target_id} has been updated.")
            break
            # Assuming IDs are unique, we can break after finding and updating.
            # If we want to update the first one regardless of ID, logic would be:
            # if announcements_list:
            #   announcements_list[0]["date"] = new_date
            #   announcements_list[0]["created_at"] = new_created_at
            #   updated = True
            #   print(f"First announcement (ID {announcements_list[0].get('id')}) has been updated.")


    if not updated:
        print(f"Announcement with ID {target_id} not found.")
        return

    with open("announcements.json", "w") as f:
        json.dump(announcements_list, f, indent=2)

    print("Timestamps updated and announcements.json saved.")

if __name__ == "__main__":
    # To fulfill the subtask, we call the update function.
    # The announcement with ID "6" is the one most recently added.
    update_latest_announcement_timestamps(target_id="6",
                                          new_date="2025-04-11T00:00:00.000Z",
                                          new_created_at="2025-04-11T00:00:00.000Z")

    # Note: If we were to re-run the creation step, it would create ID "7" now.
    # The subtask is specifically to *update* the *new* (meaning most recent, ID "6") announcement.
    # If the subtask meant "create a new one with these specific date/created_at",
    # the `create_new_announcement_at_beginning` function would be modified directly.
    # Given "Update the date and created_at fields of the new announcement object",
    # this implies modifying the existing object with ID "6".
