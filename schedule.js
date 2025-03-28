const SHEET_ID = "1YgUlwXkg3eyric0FPIPbLskKeJvZ8fW81U8iPmxlHPc";  // Thay bằng ID Google Sheet của bạn
const SHEET_NAME = "lichphatsong";  // Đặt tên sheet chính xác
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1YgUlwXkg3eyric0FPIPbLskKeJvZ8fW81U8iPmxlHPc/gviz/tq?tqx=out:json&sheet=lichphatsong"; 

// Hàm tải dữ liệu từ Google Sheets
async function loadSchedule() {
    try {
        let response = await fetch(GOOGLE_SHEET_URL);
        let text = await response.text();
        let json = JSON.parse(text.substring(47, text.length - 2)); // Xử lý JSON từ Google Sheets

        console.log("Dữ liệu gốc từ API:", json); // Kiểm tra dữ liệu nhận được

        let rows = json.table.rows;
        let scheduleList = document.getElementById("schedule-list");
        scheduleList.innerHTML = ""; // Xóa dữ liệu cũ

        rows.forEach(row => {
            let cells = row.c; // Lấy các cột
            let date = formatDate(cells[0]); // Cột A - Ngày
            let title = cells[1]?.v || "Không có tiêu đề"; // Cột B - Tiêu đề
            let link = cells[2]?.v || "#"; // Cột C - Link phát sóng

            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${date}:</strong> <a href="${link}" target="_blank">${title}</a>`;
            scheduleList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        document.getElementById("schedule-list").innerHTML = "<li>Lỗi tải lịch phát sóng!</li>";
    }
}

// Hàm định dạng ngày từ Google Sheets
function formatDate(cell) {
    if (!cell) return "N/A"; // Không có dữ liệu

    // Nếu API có định dạng hiển thị ("f"), lấy luôn giá trị đó
    if (cell.f) return cell.f;

    // Nếu API trả về dạng "Date(YYYY,M,D)"
    let match = cell.v?.match(/Date\((\d+),(\d+),(\d+)\)/);
    if (match) {
        let year = parseInt(match[1]);
        let month = parseInt(match[2]); // Tháng từ 0-11
        let day = parseInt(match[3]);
        let date = new Date(year, month, day);
        return date.toLocaleDateString("vi-VN");
    }

    return "N/A"; // Trả về "N/A" nếu không xác định được ngày
}

// Gọi hàm khi tải trang
document.addEventListener("DOMContentLoaded", loadSchedule);

