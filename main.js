function MaterialiazeInit() {
		// Auto Initialization Materialize Javascript All Component
		M.AutoInit();
  
  // No Auto Init Component
  // FAB Component
  var fab = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(fab);
  
  // Tooltip Component
  // var tooltip = document.querySelectorAll('.tooltipped');
  // var instances = M.Tooltip.init(tooltip, {
  				// outDuration: 100
  // });
}

// Toast sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

// validation input 
function htmlEncode(str){
  return String(str).replace(/[^\w. ]/gi, function(c){
     return '&#'+c.charCodeAt(0)+';';
  });
}

// show up all todo 
function renderTodo(items=[]) {
				var item = ``;
				for(var i=0;i<items.length;i++) {
								item += `
												<li class="collection-item">
      											${items[i]}
      											<a data-id="${i}" href="#!" class="secondary-content delete-todo">
      														 <i class="material-icons small red-text">delete</i>
      											</a>
      						</li>
								`;
				}
				
				document.querySelector(".list-todoo").innerHTML = item;
				
				// Delete todoo
  		const btnDeleteTodos = Array.from(document.querySelectorAll(".delete-todo"));
  		if (btnDeleteTodos != null ) {			
  		btnDeleteTodos.forEach((btn) => {
  				btn.addEventListener("click", function() {
  								
  								const id = parseInt(this.dataset.id);
  								
  								Swal.fire({
  												title: 'Are you sure?',
  												text: "You won't be able to revert this!",
  												icon: 'warning',
  												showCancelButton: true,
  												confirmButtonColor: '#3085d6',
  												cancelButtonColor: '#d33',
  												confirmButtonText: 'Yes, delete it!'
										}).then((result) => {
  												if (result.isConfirmed) {
  																		items.splice(id, 1);
    																Toast.fire({
    																				icon: 'success',
    																				title: "Your todo has been deleted"
    																})
    																
    																renderTodo(items);
  												}
									});
  								
  				});
  		});
  			
  		} 
			
}

document.addEventListener('DOMContentLoaded', function() {
  
  // Component Init Materialize
  MaterialiazeInit();
  
  // Todoo 
  const AllTodoo = [];
  
  // Add New Todo
  document.querySelector(".new-todo").addEventListener("click", function(){
  				Swal.mixin({
  								input: "textarea",
  								confirmButtonText: "Submit",
  								showCancelButton: true,
  								inputAttributes: {
																required: 'required'
										},
										inputPlaceholder: "tulis kegiatan yg ingin dilakukan ...",
										validationMessage: "Masih Kosong !!!",
										confirmButtonColor: '#3085d6',
										cancelButtonColor: '#d33'
  				}).queue([
  								"New Todoo"
  				]).then((result) => {
  								if (result.value) {
  												
  												Toast.fire({
  																icon: 'success',
  																title: 'Your todo has been added'
														});
  												
  												var newTodo = htmlEncode(result.value);
  												AllTodoo.push(newTodo);
  												renderTodo(AllTodoo);
  								}
  				});
  });
  
  renderTodo(AllTodoo);
  
});
