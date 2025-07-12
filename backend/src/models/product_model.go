package models

type ProductDto struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Stock       int     `json:"stock"`
	Image       string  `json:"image"`
	Category    string  `json:"category"`
}

func categoryIntToName(id int) string {
	switch id {
	case 1:
		return "coffee"
	case 2:
		return "non-coffee"
	default:
		return "coffee"
	}
}

func (p *Product) ToDto() ProductDto {
	return ProductDto{
		Name:        p.Name,
		Description: p.Description,
		Price:       p.Price,
		Stock:       p.Stock,
		Image:       p.Image,
		Category:    categoryIntToName(p.Category),
	}
}
