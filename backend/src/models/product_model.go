package models

type ProductDto struct {
	Id          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Stock       int     `json:"stock"`
	Image       string  `json:"image"`
	Category    int     `json:"category"`
}

func (p *Product) ToDto() ProductDto {
	return ProductDto{
		Id:          p.Id,
		Name:        p.Name,
		Description: p.Description,
		Price:       p.Price,
		Stock:       p.Stock,
		Image:       p.Image,
		Category:    p.Category,
	}
}
