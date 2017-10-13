// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			var self = this;
			$.ajax({
				method: 'DELETE',
				url: baseUrl + '/card' + self.id,
				success: function() {
					self.removeCard();
				}
			});
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
	  this.element.remove();
	}
};