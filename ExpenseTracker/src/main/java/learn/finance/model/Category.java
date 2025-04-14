package learn.finance.model;

public enum Category {
    LABOR(1,"LABOR"),
    MATERIALS(2, "MATERIALS"),
    TRANSPORTATION(3, "TRANSPORTATION"),
    EQUIPMENT_RENTAL(4,"EQUIPMENT_RENTAL"),
    MISC(5, "MISC");

    private int categoryId;
    private String categoryName;

    Category(int categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }
}
