using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IClientsService
    {
        Task<Client> RegisterClient(Client client);
        Task<List<Client>> GetClients();
    }
}
