package models

type ProductDto struct {
	Id          uint    `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Stock       int     `json:"stock"`
	Image       string  `json:"image"`
	Category    int     `json:"category"`
}

type CheckoutProduct struct {
	ID       uint `json:"id"`
	Quantity int  `json:"quantity"`
}

type CheckoutItems struct {
	ID       uint
	Quantity int
}

func (p *Product) ToDto() ProductDto {
	return ProductDto{
		Id:          p.ID,
		Name:        p.Name,
		Description: p.Description,
		Price:       p.Price,
		Stock:       p.Stock,
		Image:       p.Image,
		Category:    p.Category,
	}
}
