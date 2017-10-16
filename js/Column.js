function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'Kolumna';
    this.element = createColumn();

    function createColumn() {
        // TWORZENIE NOWYCH WĘZŁÓW
        var column = $('<div class="column"></div>');
        var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
        var columnCardList = $('<ul class="card-list"></ul>');
        var columnDelete = $('<button class="btn-delete column-delete">x</button>');
        var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');

        // PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
        columnDelete.click(function() {
            self.deleteColumn();
        });

        // DODAWANIE KARTY
        columnAddCard.click(function(event) {
            var cardName = prompt("Wpisz nazwę karty", "Nowa karta");
            if (cardName === null) {
                return;
            };
            event.preventDefault();
            $.ajax({
                method: 'POST',
                url: baseUrl + '/card',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function(response) {
                    var card = new Card(response.id, cardName);
                    self.createCard(card);
                }
            });
        });

        // KONSTRUOWANIE ELEMENTU KOLUMNY
        column.append(columnDelete)
            .append(columnTitle)
            .append(columnAddCard)
            .append(columnCardList);
        return column;
    }
}
Column.prototype = {
    createCard: function(card) {
        this.element.children('ul').append(card.element);
    },
    deleteColumn: function() {
        var self = this;
        $.ajax({
            method: 'DELETE',
            url: baseUrl + '/column/' + self.id,
            success: function(response) {
                self.element.remove();
            }
        });
    }
};