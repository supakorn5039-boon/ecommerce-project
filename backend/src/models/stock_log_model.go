package models

type StockLogDto struct {
	Id        uint `json:"id"`
	ProductID uint `json:"product_id"`
	Quantity  int  `json:"quantity"`
	Total     int  `json:"total"`
	CreatedAt int  `json:"created_at"`
}

func (s *Stock) ToDto() StockLogDto {
	return StockLogDto{
		Id:        s.ID,
		ProductID: s.ProductID,
		Quantity:  s.Quantity,
		Total:     s.Total,
		CreatedAt: int(s.CreatedAt.Unix()),
	}
}
