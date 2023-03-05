using Core.Interfaces;
using Core.Models;
using Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ClientsService: IClientsService
    {
        private readonly Context _db;
        public ClientsService(Context db) {
            _db = db;
        }

        public async Task<List<Client>> GetClients()
        {
            var clients = await _db.Clients.ToListAsync();
            return clients;
        }

        public async Task<Client> RegisterClient(Client client)
        {
            try
            {
                var clients = await _db.Clients.Where(_ => _.Email == client.Email).ToArrayAsync();
                if (clients.Any())
                {
                    throw new Exception("Клиент уже существует");
                }
                var res = await _db.Clients.AddAsync(client);
                await _db.SaveChangesAsync();
                return res.Entity;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
           
        }
    }
}
