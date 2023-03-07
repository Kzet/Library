using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientsService _clientsService;

        public ClientsController(IClientsService clientsService)
        {
            _clientsService = clientsService;
        }

        [HttpGet]
        [Route("api/clients/getClients")]
        public async Task<ActionResult> GetClients()
        {

            try
            {
                var res = await _clientsService.GetClients();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet]
        [Route("api/clients/getClientsByDebt")]
        public async Task<ActionResult> GetClientsByDebt(bool isDebtor)
        {

            try
            {
                var res = await _clientsService.GetClientsByDebt(isDebtor);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        [Route("api/clients/registerClient")]
        public async Task<IActionResult> RegisterClient(Client client)
        {

            try
            {
                if(client == null)
                {
                    return BadRequest("Поля не заполнены");
                }
                var res = await _clientsService.RegisterClient(client);
                if(res != null)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Неудалось добавить клиента");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
