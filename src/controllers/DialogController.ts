class DialogController {
  private $dialog: HTMLDialogElement;

  constructor($dialog: HTMLDialogElement) {
    this.$dialog = $dialog;
    this.$dialog.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.nodeName === 'DIALOG') {
        this.$dialog.close();
      }
    });
  }

  public openDialog() {
    this.$dialog.showModal();
  }

  public closeDialog() {
    this.$dialog.close();
  }
}

export default DialogController;
